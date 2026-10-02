export default async (req) => {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({
                error: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        const { message } = await req.json();

        if (!message) {
            return new Response(
                JSON.stringify({
                    error: "Message is required"
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5-mini",
                    input: message
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI Error:", data);

            return new Response(
                JSON.stringify({
                    error:
                        data.error?.message ||
                        `OpenAI request failed with status ${response.status}`
                }),
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                reply: data.output_text
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {

        console.error("Server Error:", error);

        return new Response(
            JSON.stringify({
                error: error.message || "Server error"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
