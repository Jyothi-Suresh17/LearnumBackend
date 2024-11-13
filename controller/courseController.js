const courses = require("../model/courseModal" );

exports.addCourseController = async (req, res) => {
  console.log("inside addCourseController");

  const { title, videolink, duration, description,content } = req.body;
  const thumbnail = req.file.filename; // Ensure this gets the filename of the uploaded file

  try {
    // Check if the course with the same video link already exists
    const existingCourse = await courses.findOne({ videolink });
    if (existingCourse) {
      return res.status(401).json({ message: "Course already exists" });
    } else {
      // Create a new course
      const newCourse = new courses({
        title,
        thumbnail,
        videolink,
        duration,
        content,
        description,
      });

      // Save the new course to the database
      await newCourse.save();

      // Respond with success message
      res
        .status(201)
        .json({ message: "Course added successfully", course: newCourse });
    }
  } catch (error) {
    console.error(error);
    res.status(406).json({ message: "Error adding course", error });
  }
};


//

exports.getallCoursesController = async (req, res) => {
  const searchKey = req.query.search;
  // console.log(searchKey);

  try {
    const courseQuery = searchKey ? { content: { $regex: searchKey, $options: 'i' } } : {};

    const allCourses = await courses.find(courseQuery);  // Removed the .limit(0)
    console.log(allCourses);
    if (allCourses.length > 0) {
      res.status(200).json(allCourses);
    } else {
      res.status(406).json('No courses found. Please add some.');
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.homeCourseController = async(req,res)=>{
  try {

    const homeCourses = await courses.find().limit(4)
    res.status(200).json(homeCourses)
    
  } catch (error) {
    res.status(401).json(error)

  }
}

//for deleting

exports.deleteCourseController = async(req,res)=>{
console.log("Inside DeleteCourseController");

  const {courseId} = req.params 
  console.log(courseId);
  try {
    
    const course = await courses.findByIdAndDelete({_id:courseId})
    res.status(200).json(course)
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
  

}

//for updating

exports.editCourseController = async(req,res)=>{
  
  console.log("Inside EditCourseController");
  const {courseId} = req.params;
  const { title, videolink, duration, description,content,thumbnail } = req.body;
  const uploadedImage = req.file?req.file.filename:thumbnail; // Ensure this gets the filename of the uploaded file

  try {

    const exsistingCourse = await courses.findByIdAndUpdate({_id:courseId},{title,videolink,duration,description,content,thumbnail:uploadedImage})

    await exsistingCourse.save();
    res.status(200).json(exsistingCourse)
    
  } catch (error) {
    res.status(401).json({ error: error.message });

    
  }
}