import axios from "axios";

interface Result {
    result: boolean;
    message: string;
}

const apiUrl = "https://api.rnilaweera.lk/api/v1/user";

class RsnFilter {
    headers = {
        Authorization: "",
    };

    constructor(apikey?: string) {
        if (!apikey) {
            throw new Error("Please provide API key");
        }

        this.validateApiKey(apikey);

        this.headers = {
            Authorization: `Bearer ${apikey}`,
        };
    }

    validateApiKey(apikey: string) {
        const validateUrl = `${apiUrl}/validate`;
        axios.post(validateUrl, {
            key: apikey
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(`Invalid API Key: ${apikey}`);
            }
        }).catch((error: any) => {
            if (error.response && error.response.status === 403) {
                throw new Error(`Invalid API Key (403 Forbidden): ${apikey}`);
            } else {
                throw new Error(`API Key Validation Error: ${error.message}`);
            }
        });
    }

    async filter(imageUrl: string): Promise<Result> {
        if (!imageUrl.match(/\.(png|jpg|jpeg)$/)) {
            throw new Error("Invalid image URL. Only PNG, JPG, and JPEG formats are supported.");
        }

        try {
            const payload = {
                imageUrl: imageUrl,
            };

            const response = await axios.post(`${apiUrl}/nsfw-detect`, payload, {
                headers: this.headers,
            });

            if (response.data.data.classification === "sfw") {
                return {
                    result: false,
                    message: "Image contains SFW content"
                };
            } else {
                return {
                    result: true,
                    message: "Image contains NSFW content"
                };
            }
        } catch (error) {
            throw new Error(`Nsfw Detect Error: ${error}`);
        }
    }
}

export { RsnFilter, Result };