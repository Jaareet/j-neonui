local isHudToggled = false
local withRadarToggle = true

local function sendNuiMessage(action, data)
    local payload = { type = tostring(action) }
    if (data and type(data) == 'table') then
        for k, v in pairs(data) do
            payload[k] = v
        end
    end
    SendNUIMessage(payload)
end


local function onTick(data)
    local stats = {}
    for k, v in pairs(data) do
        stats[v.name] = v.percent
    end
    sendNuiMessage('update', { status = stats })
end

local function GetRealPedHealth(ped)
    return math.floor(GetEntityHealth(ped) - 100) < 0 and 0 or math.floor(GetEntityHealth(ped) - 100)
end

local function showNotification(text)
    SetNotificationTextEntry('STRING')
    AddTextComponentString(text)
    DrawNotification(false, false)
end

RegisterNetEvent('esx_status:onTick', onTick)

RegisterCommand('hud', function()
    isHudToggled = not isHudToggled
    showNotification(('Hud is now %s'):format(isHudToggled and 'enabled' or 'disabled'))
end, false)


CreateThread(function()
    while (true) do
        sendNuiMessage('update', {
            status = {
                health = GetRealPedHealth(PlayerPedId()),
                armor = GetPedArmour(PlayerPedId()),
                stamina = 100 - GetPlayerSprintStaminaRemaining(PlayerId()),
                oxygen = IsPedSwimmingUnderWater(PlayerPedId()) and
                    GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10 or 0,
            },
            radar = { state = IsRadarEnabled() },
            microphone = {
                talking = NetworkIsPlayerTalking(PlayerId()),
                proximityLevel = LocalPlayer.state.proximity.index,
            },
            toggle = isHudToggled ~= false and isHudToggled or IsPauseMenuActive()
        })
        if (withRadarToggle) then
            DisplayRadar(IsPedInAnyVehicle(PlayerPedId(), false))
        end
        Wait(1000)
    end
end)
