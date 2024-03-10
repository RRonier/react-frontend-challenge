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
            "emailRequiredError": "The email is required",
            "valid_email_error": "Enter a valid email",
            "error_on_submit": "An error has occured. Please verify the data entered",
            "required_role_error": "Please select at last one role",
            "usersData": "Users Data",
            "tableSubtitle": "Detailed list of users in the database",
            "filterLabel": "Filter by name or role",
            "user": "user name",
            "email": "email",
            "roles": "roles",
            "admin_role": "admin",
            "user_role": "user",
            "actions": "actions",
            "should_delete_user_message": "Do you want to delete the user?",
            "user_deleted_message": "User has been deleted successfully",
            "new_user_added": "User added successfully",
            "add_new_user": "Add new user",
            "enter_users_data": "Please enter user's data",
            "cancel": "Cancel",
            "add_user": "Add User",
            "feature_not_implemented": "Feature not implemented"
        }
    },
    es: {
        translation: {
            "login": "Iniciar sesion",
            "userLabel": "Usuario",
            "passwordLabel": "Contraseña",
            "userRequiredError": "El usuario es obligatorio",
            "passwordRequiredError": "La contraseña es obligatoria",
            "emailRequiredError": "El correo es obligatorio",
            "required_role_error": "Por favor, seleccione al menos un rol",
            "valid_email_error": "Inserte un email valido",
            "error_on_submit": "Un error ha occurido. Por favor, verifique los datos insertados",
            "usersData": "Datos de los Usuarios",
            "tableSubtitle": "Lista detallada de los usuarios en la base de datos",
            "filterLabel": "Filtrar por nombre o rol",
            "user": "nombre de usuario",
            "email": "correo",
            "roles": "roles",
            "admin_role": "admin",
            "user_role": "usuario",
            "actions": "acciones",
            "should_delete_user_message": "¿Desea eliminar el usuario?",
            "user_deleted_message": "Usuario eliminado satisfactoriamente",
            "new_user_added": "Usuario creado satisfactoriamente",
            "add_new_user": "Agregar nuevo usuario",
            "enter_users_data": "Inserte datos del usuario por favor",
            "cancel": "Cancelar",
            "add_user": "Agregar Usuario",
            "feature_not_implemented": "Feature no implementada",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "es",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;