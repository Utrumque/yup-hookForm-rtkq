import * as yup from "yup"

export const schema = yup
		.object({
			iban: yup
				.string()
				.required("IBAN is required!")
				.matches(
					/^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/,
					"Wrong IBAN!"
				),
			fullName: yup.string().matches(/^[a-z ,.'-]+$/i, "Wrong name!"),
			city: yup.string().matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Incorrect!"),
			email: yup
				.string()
				.required("Email is required!")
				.matches(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					"Wrong email!"
				),
			password: yup
				.string()
				.required("Password is required!")
				.min(8, "At least 8 chars")
				.matches(/^(?=.{2,}$)\D*\d/, "At least 2 digits")
				.matches(
					/^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*)$/,
					"At least one upper + lower case char + special char"
				)
				.matches(
					/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
					"Only eng letters/numbers/special chars"
				),
			phone: yup
				.string()
				.matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Incorrect"),
		})
		.required()