package main


import "github.com/SommerEngineering/Ocean/Log"
import LM "github.com/SommerEngineering/Ocean/Log/Meta"

// Register all of my own configuration parameters.
func registerAllAppConfigurationParameters() {

	Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameSTARTUP, `Register now all app configuration parameters.`)
	defer Log.LogShort(senderName, LM.CategoryAPP, LM.LevelINFO, LM.MessageNameSTARTUP, `Register now all app configuration parameters done.`)

}
