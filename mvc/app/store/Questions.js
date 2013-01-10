Ext.define('SeventiesDetective.store.Questions',{
    extend: 'Ext.data.Store',
    requires: 'SeventiesDetective.model.Questions',
    model:'SeventiesDetective.model.Questions',
    data:[
        { question:"Blank" },
        { question:"Which side of town did the murderer flee to? (East/West)" },
        { question:"What gender was the murderer? (Male/Female)" },
        { question:"What part of town did the murderer flee to? (Uptown/Midtown/Downtown)" },
        { question:"Was the murder weapon a .38? (Yes/No)" },
        { question:"Where was the .38 hidden? (Location)" },
        { question:"Where was the .45 hidden? (Location)" },
        { question:"Which location has only 3 suspects? (Location)" },
        { question:"Did the murderer flee to one of 3 locations? (Yes/No)" },
        { question:"What side of town were you on? (East/West)" },
        { question:"Which part of town were you in? (Uptown/Midtown/Downtown)" },
        { question:"Were you in one of 3 locations? (Yes/No)" },
        { question:"Were you where a weapon was hidden? (Yes/No)" },
        { question:"Are the prints on the .38 left or right handed? (Left/Right)" },
        { question:"Are the prints on the .45 left or right handed? (Left/Right)" }
    ]
})



