import React from 'react'

const About = () => (
  <div style={{ maxWidth: 640, margin: "0 auto", padding: "52px 24px" }}>
    <div style={{
      display: "inline-block", background: "#EEEDFE", color: "#534AB7",
      fontSize: 12, fontWeight: 500, padding: "4px 12px",
      borderRadius: 999, marginBottom: 16
    }}>About DevPulse</div>

    <h1 style={{ fontSize: 30, fontWeight: 500, letterSpacing: -0.3, marginBottom: 14 }}>
      Built for developers, by developers
    </h1>
    <p style={{ fontSize: 15, color: "gray", lineHeight: 1.7, marginBottom: 32 }}>
      DevPulse is a community platform where developers share what they're building,
      discuss ideas, and help each other grow. No algorithm, no noise — just good writing
      from people who ship code.
    </p>

    {[
      ["Share your work", "Post about projects, experiments, and lessons learned."],
      ["Discover ideas", "Browse posts from developers across the stack."],
      ["Build in public", "Get feedback, find collaborators, and grow together."],
    ].map(([title, desc]) => (
      <div key={title} style={{
        display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start"
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: "#EEEDFE", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16
        }}>✦</div>
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 14, color: "gray", lineHeight: 1.6 }}>{desc}</div>
        </div>
      </div>
    ))}
  </div>
);

export default About;
