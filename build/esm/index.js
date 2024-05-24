var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const apiUrl = "https://api.rsnai.org/api/v1/user";
class RsnFilter {
    constructor(apikey) {
        this.headers = {
            Authorization: "",
        };
        if (!apikey) {
            throw new Error("Please provide API key");
        }
        this.validateApiKey(apikey);
        this.headers = {
            Authorization: `Bearer ${apikey}`,
        };
    }
    validateApiKey(apikey) {
        const validateUrl = `${apiUrl}/validate`;
        axios.post(validateUrl, {
            key: apikey
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(`Invalid API Key: ${apikey}`);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 403) {
                throw new Error(`Invalid API Key (403 Forbidden): ${apikey}`);
            }
            else {
                throw new Error(`API Key Validation Error: ${error.message}`);
            }
        });
    }
    filter(imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!imageUrl.match(/\.(png|jpg|jpeg)$/)) {
                throw new Error("Invalid image URL. Only PNG, JPG, and JPEG formats are supported.");
            }
            try {
                const payload = {
                    imageUrl: imageUrl,
                };
                const response = yield axios.post(`${apiUrl}/nsfw-detect`, payload, {
                    headers: this.headers,
                });
                if (response.data.data.classification === "sfw") {
                    return {
                        result: false,
                        message: "Image contains SFW content"
                    };
                }
                else {
                    return {
                        result: true,
                        message: "Image contains NSFW content"
                    };
                }
            }
            catch (error) {
                throw new Error(`Nsfw Detect Error: ${error}`);
            }
        });
    }
}
export { RsnFilter };
