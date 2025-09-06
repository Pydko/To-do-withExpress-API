const API_URL = "http://localhost:3000/api/todos";
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Görevleri getir
async function fetchTasks() {
  taskList.innerHTML = "";
  const res = await fetch(API_URL);
  const tasks = await res.json();

  tasks.forEach(task => {
    const li = document.createElement("li");

    // Görev + eklenme tarihi
    const date = task.createdAt
      ? new Date(task.createdAt).toLocaleString("tr-TR")
      : "Tarih yok";
    li.textContent = `${task.mission} (📅 ${date})`;

    // Düzenle butonu
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = async () => {
      const newMission = prompt("Yeni görev:", task.mission);
      if (newMission) {
        await fetch(`${API_URL}/${task._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mission: newMission })
        });
        fetchTasks();
      }
    };

    // Sil butonu
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = async () => {
      await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
      fetchTasks();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Yeni görev ekle
addBtn.addEventListener("click", async () => {
  const mission = taskInput.value.trim();
  if (!mission) return alert("Görev boş olamaz!");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mission })
  });

  taskInput.value = "";
  fetchTasks();
});

// Sayfa açıldığında görevleri yükle
fetchTasks();
