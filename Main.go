package main

import (
	"github.com/SommerEngineering/Ocean/Log"
	LM "github.com/SommerEngineering/Ocean/Log/Meta"
	"github.com/SommerEngineering/Ocean/System"
)

// The entry point of the Go application.
func main() {
	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameSTARTUP, `MyApp is starting.`)

	// Init the system's handlers first:
	System.InitHandlers()

	// Init Learn2Gather's handlers:
	registerHandlers()

	// Register configuration parameters to the configuration database:
	registerAllAppConfigurationParameters()

	// Init the database and collections:
	initCustomerDB()

	// Start the server and wait until the end:
	System.StartAndBlockForever()
}
