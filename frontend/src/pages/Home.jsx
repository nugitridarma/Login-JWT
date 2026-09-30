import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/authService";

const sampleData = [
  { id: 1, materi: "React Component", status: "Selesai" },
  { id: 2, materi: "React Router", status: "Selesai" },
  { id: 3, materi: "JWT Authentication", status: "Dipahami" },
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const response = await getMe(token);
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [navigate]);

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title">Home</h1>
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <p>
                Selamat datang, <strong>{user?.nama}</strong> ({user?.email})
              </p>
            )}
          </div>
        </section>

        <section className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Materi yang Dipelajari</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Materi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.materi}</td>
                      <td>
                        <span className="badge badge-success">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;