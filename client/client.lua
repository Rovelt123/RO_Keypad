InUi = false
CheckCode = function(code, callback)
    local oldCorrect = nil
    if not InUi then
        InUi = true 
        SendNUIMessage({
            code = code,
        })
        while InUi do
            Wait(5)
            SetNuiFocus(InUi, true)
        end
        Wait(100)
        SetNuiFocus(false, false)
        local oldCorrect = IsCorrect
        IsCorrect = false
        callback(oldCorrect)
    end
end

RegisterNUICallback('close-menu', function(data)
    InUi = false
    IsCorrect = "CANCEL"
end)

RegisterNUICallback('correct', function(data)
    InUi = false
    IsCorrect = data.Correct
end)

RegisterNUICallback('change', function(data)
    InUi = false
    IsCorrect = data.newCode
end)