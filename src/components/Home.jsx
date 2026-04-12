import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const TAGS = [
  { label: "React",       bg: "#EEEDFE", color: "#3C3489" },
  { label: "Backend",     bg: "#E1F5EE", color: "#085041" },
  { label: "AI / ML",     bg: "#FAECE7", color: "#712B13" },
  { label: "DevOps",      bg: "#E6F1FB", color: "#0C447C" },
  { label: "Open Source", bg: "#FBEAF0", color: "#72243E" },
];

const AVATARS = [
  { bg: "#CECBF6", color: "#3C3489" },
  { bg: "#9FE1CB", color: "#085041" },
  { bg: "#F5C4B3", color: "#712B13" },
  { bg: "#B5D4F4", color: "#0C447C" },
  { bg: "#F4C0D1", color: "#72243E" },
];

const FILTERS = ["All", "Frontend", "Backend", "AI / ML", "DevOps"];

const Home = () => {
  const { posts } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "inherit", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "60px 28px 44px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#EEEDFE", color: "#3C3489",
          fontSize: 12, fontWeight: 500, padding: "5px 14px",
          borderRadius: 999, marginBottom: 20,
          border: "0.5px solid #AFA9EC",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#534AB7", display: "inline-block"
          }} />
          Developer community · est. 2024
        </div>

        <h1 style={{
          fontSize: 42, fontWeight: 500, letterSpacing: -0.8,
          lineHeight: 1.18, marginBottom: 14, color: "inherit",
        }}>
          Where{" "}
          <span style={{ color: "#7F77DD" }}>dev ideas</span>
          <br />come to life
        </h1>

        <p style={{
          fontSize: 16, color: "gray", maxWidth: 460,
          margin: "0 auto 28px", lineHeight: 1.65,
        }}>
          Discover projects, share what you're building, and connect with
          developers who truly get it.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 440, margin: "0 auto 24px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search posts, tags, people…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", height: 44, padding: "0 18px",
              borderRadius: 999, border: "0.5px solid #ccc",
              fontSize: 14, outline: "none",
              background: "var(--color-background-secondary, #f5f5f5)",
              color: "inherit",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={{
            padding: "12px 26px", borderRadius: 999, fontSize: 14,
            fontWeight: 500, cursor: "pointer",
            background: "#534AB7", color: "#EEEDFE", border: "none",
          }}>
            Start exploring
          </button>
          <button style={{
            padding: "12px 26px", borderRadius: 999, fontSize: 14,
            fontWeight: 500, cursor: "pointer",
            background: "transparent", color: "inherit",
            border: "0.5px solid rgba(0,0,0,0.2)",
          }}>
            Share your work
          </button>
        </div>
      </section>

      {/* STATS CARDS */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14, padding: "0 28px 40px",
      }}>
        {[
          {
            bg: "#EEEDFE", border: "#AFA9EC",
            iconBg: "#CECBF6", numColor: "#3C3489",
            lblColor: "#534AB7", descColor: "#7F77DD",
            num: `${posts.length.toLocaleString()}`, lbl: "Total posts", desc: "+48 this week",
          },
          {
            bg: "#E1F5EE", border: "#5DCAA5",
            iconBg: "#9FE1CB", numColor: "#085041",
            lblColor: "#0F6E56", descColor: "#1D9E75",
            num: "342", lbl: "Trending now", desc: "Top posts today",
          },
          {
            bg: "#FAECE7", border: "#F0997B",
            iconBg: "#F5C4B3", numColor: "#712B13",
            lblColor: "#993C1D", descColor: "#D85A30",
            num: "8,640", lbl: "Community members", desc: "+120 this month",
          },
        ].map(({ bg, border, iconBg, numColor, lblColor, descColor, num, lbl, desc }) => (
          <div key={lbl} style={{
            background: bg, border: `0.5px solid ${border}`,
            borderRadius: 14, padding: "22px 20px",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: iconBg, marginBottom: 12,
            }} />
            <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: -0.5, color: numColor }}>
              {num}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: lblColor, marginTop: 4 }}>
              {lbl}
            </div>
            <div style={{ fontSize: 11, color: descColor, marginTop: 3 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION HEADER + FILTERS */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 28px", marginBottom: 18,
      }}>
        <span style={{ fontSize: 17, fontWeight: 500 }}>Trending posts</span>
        <div style={{ display: "flex", gap: 6 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "5px 14px", borderRadius: 999, fontSize: 12,
                fontWeight: 500, cursor: "pointer",
                background: activeFilter === f ? "#EEEDFE" : "transparent",
                color: activeFilter === f ? "#3C3489" : "gray",
                border: activeFilter === f
                  ? "0.5px solid #AFA9EC"
                  : "0.5px solid rgba(0,0,0,0.15)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* POST GRID */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: 16, padding: "0 28px 52px",
      }}>
        {filtered.length === 0 ? (
          <p style={{ color: "gray", padding: "24px 0", gridColumn: "1/-1" }}>
            No posts found. Be the first to create one!
          </p>
        ) : (
          filtered.map((post, i) => {
            const tag = TAGS[i % TAGS.length];
            const av = AVATARS[i % AVATARS.length];
            const times = ["2h ago", "5h ago", "1d ago", "2d ago", "3d ago"];
            const likes = [128, 94, 211, 76, 153, 88];
            return (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "var(--color-background-primary, #fff)",
                    border: "0.5px solid rgba(0,0,0,0.1)",
                    borderRadius: 14, padding: 20, cursor: "pointer",
                    transition: "transform 0.1s, border-color 0.15s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* Card top */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: "3px 10px",
                      borderRadius: 999, background: tag.bg, color: tag.color,
                    }}>
                      {tag.label}
                    </span>
                    <span style={{ fontSize: 11, color: "gray" }}>
                      {times[i % times.length]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 7, lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "gray", lineHeight: 1.6 }}>
                    {post.body.slice(0, 90)}…
                  </p>

                  {/* Card footer */}
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 16, paddingTop: 13,
                    borderTop: "0.5px solid rgba(0,0,0,0.07)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: av.bg, color: av.color,
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, fontWeight: 500,
                      }}>
                        {post.title.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontSize: 12, color: "gray" }}>@user</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "gray" }}>
                      <span style={{
                        width: 12, height: 12, borderRadius: "50%",
                        background: "#D4537E", display: "inline-block", opacity: 0.7,
                      }} />
                      {likes[i % likes.length]}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Home;