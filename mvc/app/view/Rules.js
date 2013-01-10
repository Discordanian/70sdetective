Ext.define('SeventiesDetective.view.Rules',{
	extend:'Ext.Panel',
	xtype:'rules',
	config:{
		html:"<h1>Playing the Game</h1>
			<br/>
			<ul>
			    <li>Interview the suspects.</li>
			    <li>Use logic and reasoning to figure out who the killer is.</li>
			</ul>
			<br/>
			<h3>Bang!</h3>
			<br/>
			<p>A shot rings out and someone lies dead.  <i>You</i> are the detective in charge of the investigation.</p>
			<br/>
			<p>The police have rounded up all the persons of interest in the case.  Each has a reason for wanting to kill the victim.</p>
			<br/>
			<p>The killer will <b><u>not</u></b> be found at any location where there is a weapon.  Nor will the killer be found at the crime scene.</p>
			<br/>
			<p>Suspects never lie[1] and will give you their alibi as well as answer a few 'private' questions.</p>
			<br/>
			<p>The city is broken up into 6 sections.  An upper east side, an upper west side, a mid-east side, a mid-west side, a downtown east side and finally a downtown west side.  There are never two locations in the same section of the city (ie: You cannot have both the Art Show and the Factory on the Upper East side.) </p>
			<br/>
			<p>The suspects can be either LEFT handed or RIGHT handed.  In a peculiar twist of fate, it just so happens that all ODD numbered suspects are LEFT handed and all EVEN numbered suspects are RIGHT handed.</p>
			<br/>
			<p>[1]The only question where suspects don't always tell the truth is regarding the fingerprints on the murder weapon.  The only suspects who are required to tell the truth regarding the fingerprints are those that are at the location of the murder weapon in question and are of the same <u>gender</u> as the murderer.</p>"
	}
})
