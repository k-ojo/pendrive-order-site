import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
const sheetURL = import.meta.env.VITE_REACT_APP_SHEET_URL;


export default function PendriveOrderForm() {
  const [formData, setFormData] = useState({
    indexNumber: "",
    name: "",
    class: "",
    contact: "",
    quantity: "1"
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit quantity to max 10
    if (name === "quantity" && (value < 1 || value > 10)) return;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch(sheetURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      setStatus("Submitted successfully!");
      setFormData({ indexNumber: "", name: "", class: "", contact: "", quantity: "1" });
    } catch (err) {
      setStatus("Failed to submit. Try again later.");
    }
  };

  const copyToClipboard = () => {
    const text = "0508876759";
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setStatus("Number copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Pendrive Order Form</h2>
          <div className="text-sm text-gray-600 text-center space-y-1">
            <p>
              Pay via MoMo to <span className="font-semibold">0508876759 (Gideon Adjei)</span>
              <button
                onClick={copyToClipboard}
                className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </p>
            <p>Payment validates your order.</p>
            <p><strong>Reference should be index number or full name</strong>.</p>
            <p>Pickup location: <strong>PB tent on campus</strong>.<br />Each pendrive is <strong>2GB</strong> and costs <strong>30 GHS</strong>.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="indexNumber"
              placeholder="Index Number"
              value={formData.indexNumber}
              onChange={handleChange}
              required
            />
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              required
            />
            <Input
              name="contact"
              placeholder="Contact (Phone Number)"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <div>
              <Input
                type="number"
                name="quantity"
                placeholder="Number of Pendrives"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Specify how many pendrives you want to order (max 10).</p>
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
          {status && <p className="text-center text-sm text-gray-600">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
