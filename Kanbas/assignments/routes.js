import Database from "./Database/index.js";

export default function AssignmentRoutes(app){

    // create assign
    app.post("/api/courses/:courseId/assignments/",(req,res)=>{
        const {courseId}=req.params();
        // const assign= Database.assignments.find((a)=>a.course===courseId);
        const assignment={...req.body, 
            _id: new Date().getTime().toString()};
        Database.assignments.push(assignment);
        res.send(assignment);
    })

    // Retrieve assign

    // single assign
    app.get("/api/courses/:courseId/assignments/:assignId", (req,res)=>{
        const {courseId, assignId}= req.params();
        const assignment=Database.assignments.find((a)=>a._id===assignId);
        res.send(assignment);
    });

    // multiple for same course
    app.get("/api/courses/:courseId/assignments", (req,res)=>{
        const {courseId}= req.params();
        const assignments=Database.assignments.find((a)=>a.course===courseId);
        res.send(assignments);
    });

    // Update assign

    app.put("/api/courses/:courseId/assignments/:assignId", (req,res)=>{
        const {courseId, assignId}=req.params();
        const assignment=req.body;
        Database.assignments=Database.assignments.map((a)=>
        a._id===assignId? {...a,...assignment}:a);
        res.sendStatus(204);
    })

    // Delete assign

    app.delete("/api/courses/:courseId/assignments/:assignId", (req,res)=>{
        const {courseId,assignId}=req.params;
        Database.assignments=Database.assignments.filter((a)=>a._id!==assignId);
        res.sendStatus(204);
    })
}