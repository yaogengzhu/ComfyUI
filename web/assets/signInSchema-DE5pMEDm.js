import { r as __name } from "./rolldown-runtime-DLICfi3-.js";
import { h as stringType, p as objectType } from "./vendor-zod-BzHOZx2o.js";
import { o as t } from "./i18n-Dw0liyWq.js";
const apiKeySchema = objectType({ apiKey: stringType().trim().startsWith("comfyui-", t("validation.prefix", { prefix: "comfyui-" })).length(72, t("validation.length", { length: 72 })) });
const signInSchema = objectType({
	email: stringType().email(t("validation.invalidEmail")).min(1, t("validation.required")),
	password: stringType().min(1, t("validation.required"))
});
var passwordSchema = objectType({
	password: stringType().min(8, t("validation.minLength", { length: 8 })).max(32, t("validation.maxLength", { length: 32 })).regex(/[A-Z]/, t("validation.password.uppercase")).regex(/[a-z]/, t("validation.password.lowercase")).regex(/\d/, t("validation.password.number")).regex(/[^A-Za-z0-9]/, t("validation.password.special")),
	confirmPassword: stringType().min(1, t("validation.required"))
});
const updatePasswordSchema = passwordSchema.refine((data) => data.password === data.confirmPassword, {
	message: t("validation.password.match"),
	path: ["confirmPassword"]
});
const signUpSchema = passwordSchema.extend({ email: stringType().email(t("validation.invalidEmail")).min(1, t("validation.required")) }).refine((data) => data.password === data.confirmPassword, {
	message: t("validation.password.match"),
	path: ["confirmPassword"]
});
export { updatePasswordSchema as i, signInSchema as n, signUpSchema as r, apiKeySchema as t };

//# sourceMappingURL=signInSchema-DE5pMEDm.js.map