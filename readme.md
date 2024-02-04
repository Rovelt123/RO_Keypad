This is an example to use the script


You can test it by typing /TESTME (CODE) (/Testme 1234)
RegisterCommand('TESTME', function(source, args, rawCommand)
    local Access = exports['RO_KeyPad']:CheckCode(args[1], function(Access)
        if Access == true then
            print("CODE IS CORRECT")
        elseif tonumber(Access) then
            print("NEW CODE:" ..Access)
        elseif Access == "CANCEL" then
            print("CANCELLED!")
        else
            print("WRONG CODE!")
        end

    end)
end)

Let's say you want to use it for stashes:
local Access = exports['RO_Doorlock']:CheckCode("YOUR CODE HERE", function(Access)
    if Access == true then
        print(Access)
        TriggerServerEvent("inventory:server:OpenInventory", "stash", "TEST", {
            maxweight = 6000,
            slots = 16,
        })
        TriggerEvent("inventory:client:SetCurrentStash", "TEST")
    elseif tonumber(Access) then
        TriggerServerEvent("YOUR_EVENT_FOR_CHANING_CODE", stash, Access)
    elseif Access == "CANCEL" then
        -- Your notify for cancelled
        print("CANCELLED!")
    else
        -- Your notify for wrong code
        print("WRONG CODE!")
    end

end)