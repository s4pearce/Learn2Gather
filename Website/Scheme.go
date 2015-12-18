package Website

import (
	"gopkg.in/mgo.v2/bson"
)

// The type for the View Groups page.
// used to be answers
type viewGroups struct {
	Groups   []DBstudyGroup
}

// Type for the database collection for study groups:
type DBstudyGroup struct {
	ID bson.ObjectId `bson:"_id"`
	GroupName string
	Subject string
	Members string
	Location string
	Time string
	Date string
	GroupLimit int
	TopicsCovered string
	Weekly bool
	EndDate  string
	Comments string
	Owner string
}
// Type for the database collection for the user accounts
type userList []DBuser

type DBuser struct {
	ID bson.ObjectId `bson:"_id"`
	Username string
	Password string
	FirstName string
	LastName string
	GroupsJoined []int
	Email string
}
