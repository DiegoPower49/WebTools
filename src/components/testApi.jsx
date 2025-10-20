import { useState } from "react";

export default function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!url) return alert("Please enter a URL");
    setLoading(true);
    setResponse(null);

    try {
      const options = {
        method,
        headers: JSON.parse(headers || "{}"),
      };
      if (method !== "GET" && method !== "HEAD") {
        options.body = body ? JSON.stringify(JSON.parse(body)) : undefined;
      }

      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
      });
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-2 w-full grid bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Mini API Tester</h2>
      <div className="w-full h-full grid grid-rows-1 grid-cols-2 gap-4">
        <div className="space-y-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL..."
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
          />

          <div className="flex gap-3">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-700"
            >
              {["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <button
              onClick={handleSend}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-500 p-2 rounded font-semibold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Headers (JSON)
            </label>
            <textarea
              rows="3"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Body (JSON)
            </label>
            <textarea
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={method === "GET" || method === "HEAD"}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 font-mono text-sm disabled:opacity-50"
            />
          </div>
        </div>
        <div className="mt-4 flex-1">
          <h3 className="text-lg font-semibold mb-2">Response</h3>
          <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-80">
            {response
              ? JSON.stringify(response, null, 2)
              : "Waiting for request..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
