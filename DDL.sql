SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Classes;
DROP TABLE IF EXISTS Classrooms;
DROP TABLE IF EXISTS Instructors;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE Classes (
    classID int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    day varchar(255) NOT NULL,
    capacity int(3) NULL,
    PRIMARY KEY (classID)
) ENGINE=InnoDB;

INSERT INTO Classes (`title`, `start_at`, `end_at`, `day`, `capacity`) VALUES
("MUS108", '17:00:00', '19:30:00', "M", 150),
("MUS150", '13:00:00', '13:50:00', "TR", 25),
("MUS151", '14:00:00', '14:50:00', "TR", 25),
("MUS152", '15:00:00', '15:50:00', "TR", 25),
("MUS221", '9:00:00', '10:20:00', "MWF", 80),
("MUS222", '12:00:00', '13:20:00', "MWF", 80),
("MUS223", '15:00:00', '16:20:00', "MWF", 50),
("MUS311", '10:00:00', '10:50:00', "MWF", 45),
("MUS312", '13:00:00', '13:50:00', "MWF", 30),
("MUS411", '16:00:00', '17:20:00', "WF", 20);

CREATE TABLE Classrooms (
    classroomID int(11) NOT NULL AUTO_INCREMENT,
    room_name varchar(255) NULL,
    room_number int(3) NOT NULL,
    capacity int(3) NULL,
    num_outlets int(3) NULL,
    num_doors int(3) NULL,
    PRIMARY KEY (classroomID),
    FOREIGN KEY (classID) REFERENCES Classes(classID) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO Classrooms (`room_name`, `room_number`, `capacity`, `num_outlets`, `num_doors`) VALUES
("Marlan's Office", 102, 10, 4, 1),
("Brudvig's Office", 104, 10, 3, 1),
("Clyde's Office", 109, 10, 3, 1),
("Gender Neutral Bathroom", 119, 1, 1, 1),
("Pianno Room", 130, 35, 12, 1),
("Band Room", 211, 65, 9, 2),
("Symphony Room", 216, 120, 12, 2), 
("Percussion Room", 218, 10, 4, 2),
("Female Bathroom", 219, 15, 2, 1),
("Storage Room", 302, 10, 3, 1),
(NULL, 305, 25, 5, 1),
("Practice Room 1", 305, 5, 1, 1),
("Practice Room 2", 306, 5, 1, 1),
("Practice Room 3", 307, 5, 1, 1),
("Practice Room 4", 308, 5, 1, 1),
("Male Bathroom", 319, 15, 2, 1);

CREATE TABLE Instructors (
    instructorID int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_time varchar(255) NOT NULL, 
    title varchar(255) NOT NULL,
    bio varchar(1000) NULL,
    PRIMARY KEY (instructorID)
) ENGINE=InnoDB;

INSERT INTO Instructors (`first_name`, `last_name`, `title`, `bio`) VALUES
('Marlan', 'Carlson', 'Professor', 'Orchestra and Symphony Director at OSU. Runs music operations and directs the symphony. Instructs Music Theory'),
('Martin', 'Herbert', 'Instructor', 'Band Director'),
('Lawrence', 'Johnson', 'Instructor', 'French Horn Instructor'),
('Karson', 'Keeble', 'Instructor', 'Trombone Instructor'),
('Richard', 'Mein', 'Instructor', 'Double Bass Instructor'),
('David', 'Servias', 'Instructor', 'Piano Instructor'),
('Sandra', 'Babb', 'Assistant Professor', 'Choir Conductor'),
('Robert', 'Brudvig', 'Assistant Professor', 'Percussion Instructor');
