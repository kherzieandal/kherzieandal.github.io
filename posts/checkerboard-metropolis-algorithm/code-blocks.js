(() => {
    const fallbackCopy = (text) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
    };

    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                return fallbackCopy(text);
            }
        }
        return fallbackCopy(text);
    };

    const addCodeCopyButtons = () => {
        const preBlocks = document.querySelectorAll(".article-content pre");

        preBlocks.forEach((pre) => {
            if (pre.querySelector(".code-copy-btn")) {
                return;
            }

            const code = pre.querySelector("code");
            if (!code) {
                return;
            }

            pre.classList.add("copy-enabled");

            const button = document.createElement("button");
            button.type = "button";
            button.className = "code-copy-btn";
            button.textContent = "Copy";
            button.setAttribute("aria-label", "Copy code to clipboard");

            button.addEventListener("click", async () => {
                const success = await copyText(code.textContent || "");
                if (!success) {
                    button.textContent = "Failed";
                    setTimeout(() => {
                        button.textContent = "Copy";
                    }, 1400);
                    return;
                }

                button.textContent = "Copied";
                button.classList.add("copied");
                setTimeout(() => {
                    button.textContent = "Copy";
                    button.classList.remove("copied");
                }, 1400);
            });

            pre.appendChild(button);
        });
    };

    const init = () => {
        if (window.hljs) {
            window.hljs.highlightAll();
        }
        addCodeCopyButtons();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
