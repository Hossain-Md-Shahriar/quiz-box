const adminSubject = new Subject();

// Example students as observers
const student1 = new Observer("Student 1");
const student2 = new Observer("Student 2");

// Add observers (students) to the subject
adminSubject.addObserver(student1);
adminSubject.addObserver(student2);

// When an admin adds or updates a question
app.post("/api/questions", async (req, res) => {
  const question = req.body;

  try {
    const result = await db.collection("questions").insertOne(question);
    // Notify students
    adminSubject.notifyObservers({ message: "A new question has been added." });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error adding question", error });
  }
});

app.put("/api/questions/:id", async (req, res) => {
  const questionId = req.params.id;
  const updatedQuestion = req.body;

  try {
    const result = await db
      .collection("questions")
      .updateOne({ _id: questionId }, { $set: updatedQuestion });
    // Notify students
    adminSubject.notifyObservers({ message: "A question has been updated." });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error updating question", error });
  }
});
