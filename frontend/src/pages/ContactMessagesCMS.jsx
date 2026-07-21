import React, { useState } from "react";
import { Search, Mail, Phone, Calendar, Info, Clock, MessageSquare, AlertCircle } from "lucide-react";
import useContactAdmin from "../hooks/useContactAdmin";
import EmptyState from "../components/ui/EmptyState";

export default function ContactMessagesCMS() {
  const {
    messages,
    loading,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    changeStatus
  } = useContactAdmin();

  const [selectedMessage, setSelectedMessage] = useState(null);

  // Status ID Mapper lookup
  const statuses = [
    { id: 1, name: "New", code: "NEW", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { id: 2, name: "In Progress", code: "IN_PROGRESS", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { id: 3, name: "Resolved", code: "RESOLVED", color: "bg-green-50 text-green-700 border-green-200" },
    { id: 4, name: "Closed", code: "CLOSED", color: "bg-slate-50 text-slate-700 border-slate-200" }
  ];

  const getStatusStyle = (statusId) => {
    const s = statuses.find((x) => x.id === statusId);
    return s ? s.color : "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getStatusName = (statusId) => {
    const s = statuses.find((x) => x.id === statusId);
    return s ? s.name : "Unknown";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start max-w-7xl mx-auto">
      
      {/* LEFT: Inbox List Grid */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Toolbar filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider pl-2">Enquiries Inbox</h2>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-500"
              }`}
            >
              All
            </button>
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(String(s.id))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  statusFilter === String(s.id)
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message Cards List */}
        {loading ? (
          <div className="flex justify-center items-center h-48 bg-white border border-slate-200 rounded-3xl">
            <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="Inbox is empty"
            description="All enquiries have been processed or resolved."
          />
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => {
              const statusId = msg.status?.id || 1;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-5 rounded-3xl bg-white border cursor-pointer transition-all flex flex-col justify-between gap-3 shadow-sm hover:shadow ${
                    selectedMessage?.id === msg.id 
                      ? "border-blue-500 ring-2 ring-blue-100" 
                      : "border-slate-200/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-0.5">
                        {msg.department || "General"}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {msg.subject}
                      </h4>
                    </div>

                    <span className={`inline-block border text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg shrink-0 ${getStatusStyle(statusId)}`}>
                      {getStatusName(statusId)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mt-1">
                    <span>{msg.fullName} ({msg.email})</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(msg.submittedAt || msg.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT: Active Message Details View Pane */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <Info size={16} className="text-blue-600" />
          Enquiry Details
        </h3>

        {selectedMessage ? (
          <div className="space-y-5 text-xs text-slate-600">
            
            {/* Action Status Picker workflow */}
            <div className="space-y-2 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Update Status</span>
              <div className="grid grid-cols-2 gap-2">
                {statuses.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => changeStatus(selectedMessage.id, s.id)}
                    className={`h-8 rounded-xl font-bold uppercase tracking-wider transition-all border ${
                      (selectedMessage.status?.id || 1) === s.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Submitted By</span>
                <span className="font-bold text-slate-800 text-sm">{selectedMessage.fullName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5 font-mono">Contact Details</span>
                <span className="block text-slate-700 flex items-center gap-1.5 mt-1 font-semibold">
                  <Mail size={12} className="text-slate-400" />
                  {selectedMessage.email}
                </span>
                {selectedMessage.phone && (
                  <span className="block text-slate-700 flex items-center gap-1.5 mt-1 font-semibold">
                    <Phone size={12} className="text-slate-400" />
                    {selectedMessage.phone}
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Department</span>
                <span className="font-bold text-slate-800">{selectedMessage.department || "General Admin"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Subject</span>
                <span className="font-extrabold text-slate-800 text-sm">{selectedMessage.subject}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Message Description</span>
                <p className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-700 leading-relaxed break-words whitespace-pre-line font-medium">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            {/* Reusable internal notes panel */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <MessageSquare size={13} className="text-slate-400" />
                Internal Followup Notes
              </span>
              <textarea 
                rows={3}
                placeholder="Log internal updates or notes about this enquiry..."
                className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-12">
            Select an inbox enquiry card to view full contact specs and change message statuses.
          </p>
        )}
      </div>

    </div>
  );
}
