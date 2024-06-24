/*=============================================================================*\
 * RPG Maker MV/MZ - CT_Bolt's Core Plugin
 * Terms of Use:
 *  Free for commercial or non-commercial use
 *
/*=============================================================================*/
/*:
 * @target MZ
 * @plugindesc [RPG Maker MV/MZ] [Tier 0] [Version 1.26] [CT_Bolt - CoreEngine]
 * @author CT_Bolt
 *
 * @param Text Outline Color
 * @text Text Outline Color
 * @desc Text Outline Color
 * Default: rgba(0, 0, 0, 0.75)
 * @default rgba(0, 0, 0, 0.75)
 *
 * @param ICON_BUFF_START
 * @text Icon Buff Start Index
 * @desc Icon Buff Start Index
 * Default: 32 (blank = no change)
 * @default
 *
 * @param ICON_DEBUFF_START
 * @text Icon Debuff Start Index
 * @desc Icon Debuff Start Index
 * Default: 48 (blank = no change)
 * @default
 *
 * @help
 * This plugin is a core plugin and is required by other certain plugins
 *
 * Event Comment Tags:
 *  Page_Code: <javascript/>
 *  Page_Code_Post: <javascript/>
 *
 */
/*=============================================================================*/

var CTB = CTB || {}; CTB.Core  = CTB.Core || {};
var Imported = Imported || {}; Imported["CT_Bolt Core"] = 1.26;

"use strict";
(function ($_$) {
    const NAMESPACE   = 'Core';
    const PLUGIN_NAME = 'CTB_' + NAMESPACE;
	
    function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.params = getPluginParameters();
	//$_$.params['Text Outline Color'] = $_$.params['Text Outline Color'] || "rgba(0, 0, 0, 0.75)";
	
	if ($_$.params['ICON_BUFF_START']){
		Game_BattlerBase.ICON_BUFF_START = Number($_$.params['ICON_BUFF_START']);
	};
	
	if ($_$.params['ICON_DEBUFF_START']){
		Game_BattlerBase.ICON_BUFF_START = Number($_$.params['ICON_DEBUFF_START']);
	};
		
	$_$['ColorManager.outlineColor'] = ColorManager.outlineColor;
	ColorManager.outlineColor = function() {
		return $_$.params['Text Outline Color'] ? $_$.params['Text Outline Color'] : $_$['ColorManager.outlineColor'].apply(this, arguments);
	};
	
	// New - (Core)
	Game_CharacterBase.prototype.readCommentMV = function(tag, ev){return this.readComment(tag, ev);};
	
	// New - (Core)
	Game_CharacterBase.prototype.readCommentMZ = function(tag, ev){return this.readComment(tag, ev);};

	// New - (Core)
	Game_CharacterBase.prototype.readComment = function(tag, ev) {
		if (tag){
			const endTag = '/>';
			var RX = new RegExp('('+tag+': \\<([\\s\\S]*)\\/>)');			
			ev = ev || this;
			var fullComment = '';
			if (ev.list){
				var data = ev.list().filter(function(c) {return c.code === 108 || c.code === 408;}).map(function(c) {			  
					fullComment = fullComment + c.parameters[0];
				});
			}else{
				var memberIndex = ev._memberIndex || 0;
				var actorId = $gameParty._actors[memberIndex]
				if (actorId){
					fullComment = $dataActors[actorId].note;
				};
			};
			var match = RX.exec(fullComment);
			data = match ? match[2] : '';
			data = data + endTag;
			ev[tag] = data.substr(0, data.indexOf(endTag));
		};
		return ev[tag];
	};
	
	// New - (Core)
	Game_Map.prototype.readMapNoteMV = function(tag, v, map) {return this.readMapNote(tag, v, map);};
	
	// New - (Core)
	Game_Map.prototype.readMapNoteMZ = function(tag, v, map) {return this.readMapNote(tag, v, map);};
		
	// New - (Core)
	Game_Map.prototype.readMapNote = function(tag, v, map) {
		map = map || $dataMap;
		if (tag){
			const endTag = '/>';
			var RX = new RegExp('('+tag+': \\<([\\s\\S]*)\\/>)');			
			v = v || this;
			var fullComment = map.note;
			var match = RX.exec(fullComment);
			data = match ? match[2] : '';
			data = data + endTag;
			v[tag] = data.substr(0, data.indexOf(endTag));
		};
		v = v || [];
		return v[tag];
	};
	
	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//
	
	Game_CharacterBase.MOTIONS = {
		walk:     { index: 0, direction: 2, loop: true  },
		wait:     { index: 0, direction: 4, loop: true  },
		chant:    { index: 0, direction: 6, loop: true  },
		guard:    { index: 0, direction: 8, loop: true  },
		damage:   { index: 3, direction: 2, loop: false },
		evade:    { index: 3, direction: 4, loop: false },
		thrust:   { index: 1, direction: 2, loop: false },
		swing:    { index: 1, direction: 4, loop: false },
		missile:  { index: 1, direction: 6, loop: false },
		skill:    { index: 1, direction: 8, loop: false },
		spell:    { index: 5, direction: 2, loop: false },
		item:     { index: 5, direction: 4, loop: false },
		escape:   { index: 2, direction: 2, loop: true  },
		victory:  { index: 2, direction: 4, loop: true },
		dying:    { index: 2, direction: 6, loop: true  },
		abnormal: { index: 2, direction: 8, loop: true  },
		sleep:    { index: 6, direction: 2, loop: true  },
		dead:     { index: 6, direction: 4, loop: true  }
	};
	
	// Alias
	$_$['Game_CharacterBase.prototype.initMembers'] = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		$_$['Game_CharacterBase.prototype.initMembers'].apply(this, arguments);
		this._motion = null;
		this._motionCount = 0;
	};
	
	// New
	Game_CharacterBase.prototype.customPath = function() {
		if (this._customPath === 'default'){return null;};
		return this._customPath;
	};
	
	// New
	Game_CharacterBase.prototype.customRows = function() {
		return this._customRows;
	};
	
	// New
	Game_CharacterBase.prototype.customCols = function() {
		return this._customCols;
	};
	
	// New
	Game_CharacterBase.prototype.setCustomRows = function(value) {
		this._customRows = value;
	};
	
	// New
	Game_CharacterBase.prototype.setCustomCols = function(value) {
		this._customCols = value;
	};
	
	// New
	Game_CharacterBase.prototype.setImagePath = function(path) {
		this._customPath = path;
	};
	
	// Alias
	$_$['Game_CharacterBase.prototype.setImage'] = Game_CharacterBase.prototype.setImage;
	Game_CharacterBase.prototype.setImage = function(characterName, characterIndex, path, data) {
		$_$['Game_CharacterBase.prototype.setImage'].apply(this, arguments);
		if (path) {this.setImagePath(path);};
		if (!data){data = {cols:null,rows:null};};
		this.setCustomRows(data.rows);
		this.setCustomCols(data.cols);
	};
	
	// Alias 
	$_$['Game_CharacterBase.prototype.updatePattern'] = Game_CharacterBase.prototype.updatePattern;
	Game_CharacterBase.prototype.updatePattern = function() {
		if (this._customPatternCode){			
			eval(this._customPatternCode);			
		}else{
			$_$['Game_CharacterBase.prototype.updatePattern'].apply(this, arguments);
		};
	};
	
	// New
	Game_CharacterBase.prototype.setupMotion = function(motion, nextCode, speed) {
		this.startMotion(motion, nextCode, speed);
		this._customPatternCode = 'this.updateMotionCount()';
	};
	
	// New
	Game_CharacterBase.prototype.updatePatternEx = function() {
		var pattern = this._pattern < 3 ? this._pattern : 1;
	};
	
	// New
	Game_CharacterBase.prototype.startMotion = function(motionType, nextCode, speed) {
		var newMotion = Game_CharacterBase.MOTIONS[motionType];
		//if (this._motion !== newMotion || repeated) {
			this._motion = newMotion;
			this._motionCount = 0;
			this._pattern = 0;
			this._characterIndex = this._motion.index;
			this._directionFix = false;
			this._direction = this._motion.direction;
			this._directionFix = true;
		//}
		if (this._nextCode !== nextCode){
			this._nextCode = nextCode;
		};
		if (this._motionSpeed !== speed){
			this._motionSpeed = speed;
		};
	};
	
	
	//this.setupMotion('thrust',"SceneManager._scene._messageWindow.newMessage('Keeyah!!!'); this.setupMotion('thrust')")
	//this.setupMotion('thrust',"SceneManager._scene._messageWindow.newMessage('Keeyah!!!'); this.setupMotion('thrust','this.setupMotion('"+'spell'+'")")
	
		
	// New
	/*
	Game_CharacterBase.prototype.setupMotions = function(data) {
		let motionCode = "";
		let count = 0;
		data.forEach((v, i) => {
			motionCode += "this.setupMotion('" + v.name;
			if (v.code){
				motionCode += "'," + '"' + v.code + "; ";
			}else{
				if (i < data.length-1) {motionCode += "',";};
			};
			//motionCode += '"';
			count++;
		}, this);
		
		motionCode += "'"
		
		for (let i = 0; i < count-1; i++){
			motionCode += ")";
		};
		
		motionCode += '");';
		console.log(motionCode);
		eval(motionCode);
	};
	*/
	
	// New
	Game_CharacterBase.prototype.resetMotion = function() {
		this._motion = null;
		this._motionSpeed = null;
		this._motionCount = 0;
		this._customPatternCode = null;
		this._nextCode = null;
	};
	
	// New
	Game_CharacterBase.prototype.updateMotionCount = function() {	
		if (this._motion && ++this._motionCount >= this.motionSpeed()) {
			if (this._motion.loop) {
				this._pattern = (this._pattern + 1) % 4;
			} else if (this._pattern < 2) {
				this._pattern++;
			} else {
				if (this._nextCode){
					eval(this._nextCode);
				};
			}
			this._motionCount = 0;
		}
	};
	
	// New
	Game_CharacterBase.prototype.motionSpeed = function() {
		return this._motionSpeed || 1;
	};
	
	//-----------------------------------------------------------------------------
	// Game_Event
	//
	
	// New
	Game_Event.prototype.setPageImage = function(filename) {
		this.event().pages[this._pageIndex].image.characterName = filename;
	};
	
	// New
	Game_Event.prototype.setActor = function(id, dontChange) {
		const actor = $gameActors.actor(id);
		if (actor){
			this._actor = actor;
			this._actorId = actor._actorId;		
			if (!dontChange){
				this.setImage(actor.characterName(), actor.characterIndex());
			};
		};
	};
		
	// Alias
	$_$['Game_Event.prototype.setupPageSettings'] = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		var page = this.page();
		var image = page.image;
		let comment = 'Page_Code';
		this.readComment(comment);
		//console.log(this[comment]);
		if (this[comment]){
			eval(this[comment]);
		};
		$_$['Game_Event.prototype.setupPageSettings'].apply(this, arguments);
		comment = 'Page_Code_Post';
		this.readComment(comment);
		if (this[comment]){
			eval(this[comment]);
		};
	};
	
	//-----------------------------------------------------------------------------
	// Sprite_Character
	//
	
	// Alias
	$_$['Sprite_Character.prototype.setCharacterBitmap'] = Sprite_Character.prototype.setCharacterBitmap;
	Sprite_Character.prototype.setCharacterBitmap = function() {
		if (this._customPath){
			let hue = 0;
			this.bitmap = ImageManager.loadBitmap(this._customPath, this._characterName, hue, false);
			this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
		}else{
			$_$['Sprite_Character.prototype.setCharacterBitmap'].apply(this, arguments);
		};
	};
	
	// Alias
	$_$['Sprite_Character.prototype.updateBitmap'] = Sprite_Character.prototype.updateBitmap;
	Sprite_Character.prototype.updateBitmap = function() {
		if (this.isImageChanged()) {
			this._customPath = this._character.customPath();
			if (this.isSVActor()){
				if (!this._character.customRows() && !this._character.customCols()){
					this._character.setCustomRows(6);
					this._character.setCustomCols(9);
				};
			};
		};
		$_$['Sprite_Character.prototype.updateBitmap'].apply(this, arguments);
	};
	
	// Alias
	$_$['Sprite_Character.prototype.updateFrame'] = Sprite_Character.prototype.updateFrame;
	Sprite_Character.prototype.updateFrame = function() {
		if (this.isRowsChanged()) {
			this._customRows = this._character.customRows();
		};
		if (this.isColsChanged()) {
			this._customCols = this._character.customCols();
		};
		$_$['Sprite_Character.prototype.updateFrame'].apply(this, arguments);
	};

	// Alias
	$_$['Sprite_Character.prototype.isImageChanged'] = Sprite_Character.prototype.isImageChanged;
	Sprite_Character.prototype.isImageChanged = function() {
		let v = $_$['Sprite_Character.prototype.isImageChanged'].apply(this, arguments);
		return v || this._customPath !== this._character.customPath() || this._customRows !== this._character.customRows()  || this._customRows !== this._character.customRows();
	};
	
	// New
	Sprite_Character.prototype.isRowsChanged = function() {
		return this._customRows !== this._character.customRows();
	};
	
	// New
	Sprite_Character.prototype.isColsChanged = function() {
		return this._customCols !== this._character.customCols();
	};
	
	// Alias
	$_$['Sprite_Character.prototype.patternWidth'] = Sprite_Character.prototype.patternWidth;
	Sprite_Character.prototype.patternWidth = function() {
		if (this._customCols){
			return this.bitmap.width / this._customCols;
		}else{
			return $_$['Sprite_Character.prototype.patternWidth'].apply(this,arguments);
		};
	};

	// Alias
	$_$['Sprite_Character.prototype.patternHeight'] = Sprite_Character.prototype.patternHeight;
	Sprite_Character.prototype.patternHeight = function() {
		if (this._customRows){
			return this.bitmap.height / this._customRows;
		}else{
			return $_$['Sprite_Character.prototype.patternHeight'].apply(this,arguments);
		};
	};
	
	// New
	Sprite_Character.prototype.isSVActor = function() {
		if (this._customPath){return this._customPath.toLowerCase().includes('sv_actors');};
		return false;
	};
	
	// New
	Window_Message.prototype.newMessage = function(text) {
		$gameMessage._texts = [];
		$gameMessage.add(text);
		this._textState = {};
		this._textState.index = 0;
		this._textState.text = this.convertEscapeCharacters($gameMessage.allText());		
		this.pause = false;
		this.newPage(this._textState);
	};

	$_$['Game_Actor.prototype.initEquips'] = Game_Actor.prototype.initEquips;
	Game_Actor.prototype.initEquips = function(equips) {
		$_$['Game_Actor.prototype.initEquips'].apply(this, arguments);
		let i = 0;
		for (v of this._equips){
			v._slotId = i;
			v._actorEquipped = this._actorId;
			i++;
		};
	};
	
})(CTB.Core);

//-----------------------------------------------------------------------------
// Pixi_WindowLayer
//

function Pixi_WindowLayer() {
	this.initialize(...arguments);
}

Pixi_WindowLayer.prototype = Object.create(WindowLayer.prototype);
Pixi_WindowLayer.prototype.constructor = Pixi_WindowLayer;
	
Pixi_WindowLayer.prototype.initialize = function() {
	PIXI.Container.call(this);
	this._width = 0;
	this._height = 0;
	this.interactive = false;
};

Pixi_WindowLayer.prototype.renderCanvas = PIXI.Container.prototype.renderCanvas;
Pixi_WindowLayer.prototype._canvasClearWindowRect = PIXI.Container.prototype._canvasClearWindowRect;
Pixi_WindowLayer.prototype.renderWebGL = PIXI.Container.prototype.renderWebGL;
Pixi_WindowLayer.prototype._maskWindow = PIXI.Container.prototype._maskWindow;