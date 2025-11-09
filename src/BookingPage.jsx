// BookingPage.jsx
import { useState } from "react";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "人寿保险咨询",
    date: "",
    time: "",
    note: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 模拟提交，可替换为你的后端API地址
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "人寿保险咨询",
          date: "",
          time: "",
          note: "",
        });
      } else {
        throw new Error("提交失败");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          📅 保险咨询预约
        </h1>
        <p className="text-gray-600 text-center mb-6">
          请选择方便的时间，我们会与您确认咨询安排。
        </p>

        {status === "success" ? (
          <div className="text-center text-green-600 font-medium py-10">
            ✅ 预约成功！我们将尽快与您联系确认。
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">姓名</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="请输入姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">电话</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="(例) 514-123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">咨询类型</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option>人寿保险咨询</option>
                <option>医疗保险咨询</option>
                <option>旅游保险咨询</option>
                <option>汽车保险咨询</option>
                <option>其他</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">日期</label>
                <input
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">时间</label>
                <input
                  name="time"
                  type="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">备注（可选）</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="填写您的问题或其他信息"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
              {status === "loading" ? "提交中..." : "立即预约"}
            </button>

            {status === "error" && (
              <div className="text-red-500 text-center text-sm">
                提交失败，请稍后再试。
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
