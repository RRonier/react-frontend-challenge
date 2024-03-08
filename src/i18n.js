import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "login": "Login",
            "userLabel": "User",
            "passwordLabel": "Password",
            "userRequiredError": "The user is required",
            "passwordRequiredError": "The password is required",
            "usersData": "Users Data",
            "tableSubtitle": "Detailed list of users in the database",
            "filterLabel": "Filter by name or role",
            "user": "user",
            "email": "email",
            "roles": "roles",
            "actions": "actions",
            "should_delete_user_message": "Do you want to delete the user?",
            "user_deleted_message": "User has been deleted successfully"
        }
    },
    es: {
        translation: {
            "login": "Iniciar sesion",
            "userLabel": "Usuario",
            "passwordLabel": "Contraseña",
            "userRequiredError": "El usuario es obligatorio",
            "passwordRequiredError": "La contraseña es obligatoria",
            "usersData": "Datos de los Usuarios",
            "tableSubtitle": "Lista detallada de los usuarios en la base de datos",
            "filterLabel": "Filtrar por nombre o rol",
            "user": "usuario",
            "email": "correo",
            "roles": "roles",
            "actions": "acciones",
            "should_delete_user_message": "¿Desea eliminar el usuario?",
            "user_deleted_message": "Usuario eliminado satisfactoriamente"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;