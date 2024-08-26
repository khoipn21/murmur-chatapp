import * as yup from "yup";

const SUPPORTED_FORMATS = [
	"image/jpeg",
	"image/png",
	"audio/mpeg",
	"audio/wav",
];

export const FileSchema = yup.object().shape({
	file: yup
		.mixed<File>()
		.nullable()
		.test("count", "Only one file is allowed", (value) => {
			return !!value; // Ensure there is a file
		})
		.test("fileSize", "The file is too large", (value) => {
			return !!value && value.size < 5000000;
		})
		.test(
			"type",
			"Only the following formats are accepted: Image and Audio",
			(value) => {
				return !!value && SUPPORTED_FORMATS.includes(value.type);
			},
		),
});
