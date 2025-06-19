import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/catalog/LoadingScreen";

const ProtectedRoute = ({ children, roles = [] }) => {
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    // Функция для декодирования токена
    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Token decode error:", error);
            return null;
        }
    };

    // Функция проверки срока действия токена
    const checkTokenExpiry = (decodedToken) => {
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            toast.error('Срок сессии закончился!');
            return false;
        }
        return true;
    };

    // Основная проверка авторизации
    useEffect(() => {
        setIsChecking(true);
        
        // 1. Проверка наличия токена
        if (!token) {
            handleAuthError('Сначала авторизируйтесь!');
            return;
        }

        // 2. Декодирование токена
        const decodedToken = decodeToken(token);
        if (!decodedToken) {
            handleAuthError('Невалидный токен авторизации');
            return;
        }

        // 3. Проверка срока действия
        if (!checkTokenExpiry(decodedToken)) {
            navigate('/authorization');
            return;
        }

        // 4. Проверка ролей (если требуется)
        if (roles.length > 0) {
            const userRole = storedRole || decodedToken.role;
            if (!userRole || !roles.includes(userRole)) {
                handleAuthError('Недостаточно прав доступа');
                navigate('/');
                return;
            }
        }

        // 5. Запускаем периодическую проверку токена
        const expiryCheckInterval = setInterval(() => {
            const currentDecoded = decodeToken(localStorage.getItem('token'));
            if (currentDecoded && !checkTokenExpiry(currentDecoded)) {
                clearInterval(expiryCheckInterval);
                navigate('/authorization');
            }
        }, 300000); // Проверка каждые 5 минут

        setIsChecking(false);
        
        return () => clearInterval(expiryCheckInterval);
    }, [token, storedRole, navigate, roles]);

    const handleAuthError = (message) => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        toast.error(message);
        navigate('/authorization');
    };

    if (isChecking) return <LoadingScreen />;
    return children;
};

export default ProtectedRoute;