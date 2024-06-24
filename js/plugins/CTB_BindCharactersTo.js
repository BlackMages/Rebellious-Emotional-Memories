//=============================================================================
// RPG Maker MZ - CT_Bolt's Bind Characters To
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 0.90] [CT_Bolt - Bind Characters To]
 * @author CT_Bolt
 *
 * @help
 * *Warning: Current Version Breaks Touch Movement*
 *
 * Script calls:
 *  this.bindTo(character,xOffset,yOffset,forceDirectionMode)
 *    character: Character object to be bound to
 *    xOffset: X Offset (this is tilesize based, eg. .25 is 25% of a tile)
 *    xOffset: Y Offset (this is tilesize based, eg. .25 is 25% of a tile)
 *    forceDirectionMode: 
 *      -1 (does not force the to match direction of binded character)
 *       0 (default mode, matches direction of binded character)
 *       1 (matches direction of binded character 1 time)
 *       2 (matches direction of binded character, even if direction fix is on)
 *
 *  All parameters are optional except character
 *
 *  this.unbind()
 *    unbinds the character
 *
 * Examples: 
 *  this.bindTo($gamePlayer)
 *  this.bindTo($gameMap.event(2))
 *  this.bindTo($gamePlayer, .25, 1)
 *  this.bindTo($gamePlayer, 0, 0, 2)
 *  this.unbind() 
 * 
 * Works wonderfully with my Core Plugin event comment tags :)
 * When using my core plugin place a comment in the events page like this...
 * Setup something like this:
 *  Page_Code: <this.bindTo($gamePlayer)/>
 *   That will automatically make the page of an event be "bound" to the players location
 *
 *  Page_Code: <this.unbind()/>
 *   That will unbind a bound character
 */
//=============================================================================
//=============================================================================
 
var CTB = CTB || {}; CTB.BindCharactersTo  = CTB.BindCharactersTo || {};
var Imported = Imported || {}; Imported["CTB_BindCharactersTo"] = 0.90;

"use strict";
(($_$) => {
    const NAMESPACE   = 'BindCharactersTo';
    const PLUGIN_NAME = 'CTB_' + NAMESPACE;
	
	function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.params = getPluginParameters();
	
	// New
	Game_CharacterBase.prototype.unbind = function() {
		this.bindTo(null);
		//this._boundData = this._chaseData = null;
	};
		
	// New
	Game_CharacterBase.prototype.bindTo = function(obj,x,y,forceDirectionMode=0) {
		let data = {object:obj,x:x,y:y};
		if (obj){
			obj._boundedList = obj._boundedList || [];
			obj._boundedList.push({object:this,x:x,y:y,forceDirectionMode:forceDirectionMode});
		}else{		
			if (this._boundData){
				if (this._boundData.object){
					this._boundData.object._boundedList = this._boundData.object._boundedList || [];
					this._boundData.object._boundedList.splice(this._boundData.object._boundedList.findIndex(v => !!v ? v.object === data.object : false), 1)
				};
			};
			data = null;
		};
		this._boundData = this._chaseData = data;
	};
	
	// New
	$_$['Game_CharacterBase.prototype.update'] = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function(active) {
		//if(this.constructor.name !== 'Game_Player'){
			
		if (this._boundData && !this.isStopping()) {
			if (this._moveType === 3){
				this.moveTypeCustom();
			};
		};
		
		$_$['Game_CharacterBase.prototype.update'].apply(this, arguments);
		
		if (this._boundData){
			/*
			let data = this._boundData;
			if (data.object){
				data.x = data.x || 0;
				data.y = data.y || 0;
				this._x = this._realX = data.object._realX + eval(data.x);
				this._y = this._realY = data.object._realY + eval(data.y);
				this._chaseData = data;
			};
			if (data.unBind){
				this._chaseData = null;
				this._boundData = null;
			};
			*/
		};
		if (this._chaseData){
			//this.chaseCharacter(this._chaseData.object,this._chaseData.x,this._chaseData.y);
		};
			
		this._boundedList = this._boundedList || [];
		for (v of this._boundedList){
			v.x = v.x || 0;
			v.y = v.y || 0;
			v.object._x = v.object._realX = this._realX + eval(v.x);
			v.object._y = v.object._realY = this._realY + eval(v.y);
			switch (v.forceDirectionMode){
				case 0:
					v.object.setDirection(this._direction);
					break;
				case 1:
					v.object.setDirection(this._direction);
					v.forceDirectionMode = -1;
					break;
				case 2:
					v.object._direction = this._direction;
					break;					
			};			
		};
		//}else{
			//$_$['Game_CharacterBase.prototype.update'].apply(this, arguments);
		//};
	};
	
	// New
	Game_CharacterBase.prototype.chaseCharacter = function(character,x=0,y=0) {
		if (character){
			if (character !== this){
			const sx = this.deltaXFrom(character.x+eval(x));
			const sy = this.deltaYFrom(character.y+eval(y));
			if (sx !== 0 && sy !== 0) {
				this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
			} else if (sx !== 0) {
				this.moveStraight(sx > 0 ? 4 : 6);
			} else if (sy !== 0) {
				this.moveStraight(sy > 0 ? 8 : 2);
			}
			this.setMoveSpeed(character.realMoveSpeed());			
			};
		};
	};
	
	$_$['Game_CharacterBase.prototype.isMoving'] = Game_CharacterBase.prototype.isMoving;
	Game_CharacterBase.prototype.isMoving = function() {
		let v = $_$['Game_CharacterBase.prototype.isMoving'].apply(this, arguments);
		if (this._boundData){
			if (this._boundData.object){
				if (this !== this._boundData.object) {v = this._boundData.object.isMoving();};
			};
		};
		return v;
	};

})(CTB.BindCharactersTo, this);

