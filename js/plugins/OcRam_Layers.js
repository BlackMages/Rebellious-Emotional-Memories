//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Layers.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.14) alert("OcRam core v1.14 or greater is required!");

OcRam.addPlugin("Layers", "1.06");

/*:
 * @target MZ
 * @plugindesc v1.06 Display ultra fast parallax layers or dynamic scrolling/looping tiled layers (even in title/battle for fog, sandstorm etc... effects).
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Lights
 * @orderBefore OcRam_Passages
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command setParallax
 * @text Parallax Layer
 * @desc Set ultra fast parallax layer!
 *
 * @arg imageName
 * @type string
 * @default map[mapId]
 * @text Image name
 * @desc Image name. Use [mapId], [tilesetId], [var:X] to use 'dynamic names'.
 *
 * @arg zIndex
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @text Z-index
 * @desc What is the z-index of this layer?
 * @default 3
 *
 * @arg animFrames
 * @type number
 * @decimals 0
 * @default 0
 * @text Animation frames
 * @desc Animation frames.
 *
 * @arg animRate
 * @type number
 * @decimals 0
 * @default 0
 * @text Animation rate
 * @desc Animation frames per second.
 *
 * @command setLayer
 * @text Template Layer
 * @desc Set layer(s) from templates.
 *
 * @arg templateName
 * @type string
 * @default my_template
 * @text Template
 * @desc Template name exactly as it is.
 *
 * @command setCustomLayer
 * @text Custom Layer
 * @desc Set custom layer.
 *
 * @arg zIndex
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @text Z-index
 * @desc What is the z-index of this layer?
 * @default 3
 *
 * @arg imageName
 * @type string
 * @default my_pic
 * @text Image name
 * @desc Image name.
 *
 * @arg opacity
 * @type number
 * @decimals 2
 * @min 0.00
 * @max 255.00
 * @default 255
 * @text Opacity
 * @desc Opacity.
 *
 * @arg fixToMap
 * @type boolean
 * @default true
 * @text Fix to Map
 * @desc Fix layer to the map?
 *
 * @arg fader
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 255.00
 * @default 255.00
 * @text Fade
 * @desc Opacity gained per frame?
 *
 * @arg scrollX
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0.00
 * @text ScrollX
 * @desc Scroll X.
 *
 * @arg scrollY
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0.00
 * @text ScrollY
 * @desc Scroll Y.
 *
 * @arg loopX
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0.00
 * @text LoopX
 * @desc Loop X.
 *
 * @arg loopY
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0.00
 * @text LoopY
 * @desc Loop Y.
 *
 * @arg offsetX
 * @type number
 * @decimals 0
 * @default 0
 * @text OffsetX
 * @desc Offset X.
 *
 * @arg offsetY
 * @type number
 * @decimals 0
 * @default 0
 * @text OffsetY
 * @desc Offset Y.
 *
 * @arg animFrames
 * @type number
 * @decimals 0
 * @default 0
 * @text Animation frames
 * @desc Animation frames.
 *
 * @arg animRate
 * @type number
 * @decimals 0
 * @default 0
 * @text Animation rate
 * @desc Animation frames per second.
 *
 * @arg battleLayer
 * @type boolean
 * @default true
 * @text Inherit to battle
 * @desc Inherit layer to battle?
 *
 * @arg clearOnTransfer
 * @desc Clear layer when transfered to another map.
 * @type boolean
 * @text Clear on transfer
 * @default false
 *
 * @command clearLayer
 * @text Clear Layer
 * @desc Clear layer.
 *
 * @arg imageName
 * @type string
 * @default my_pic
 * @text Image name
 * @desc Clear all layers with this 'Image name'. * = Any layer.
 *
 * @arg zIndex
 * @type select
 * @option [Any z-index]
 * @value -1
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @text Z-index
 * @desc Clear all layers with this z-index.
 * @default -1
 *
 * @arg fader
 * @type number
 * @decimals 2
 * @min 0
 * @max 255
 * @default 255
 * @text Fader
 * @desc Lose this amount of opacity per frame. 255 = Instant, 1 = Slow, 0.1 = Mega Slow
 *
 * @command showPicture
 * @text Show Picture
 * @desc Show picture (even with smooth fade!).
 *
 * @arg pictureId
 * @type number
 * @decimals 0
 * @default 1
 * @text Picture Id
 * @desc Picture id.
 *
 * @arg pictureName
 * @type file
 * @dir img/pictures
 * @default my_picture
 * @text Picture Name
 * @desc Picture name.
 *
 * @arg origin
 * @type select
 * @option Upper-Left
 * @value 0
 * @option Center
 * @value 1
 * @default 0
 * @text Origin
 * @desc Origin point of the picture.
 *
 * @arg x
 * @type number
 * @decimals 0
 * @default 0
 * @text X
 * @desc X coordinate of the picture.
 *
 * @arg y
 * @type number
 * @decimals 0
 * @default 0
 * @text Y
 * @desc Y coordinate of the picture.
 *
 * @arg scaleX
 * @type number
 * @decimals 0
 * @min 0
 * @max 10000
 * @default 100
 * @text Width
 * @desc Horizontal scale of the picture.
 *
 * @arg scaleY
 * @type number
 * @decimals 0
 * @min 0
 * @max 10000
 * @default 100
 * @text Height
 * @desc Vertical scale of the picture.
 *
 * @arg opacity
 * @type number
 * @decimals 0
 * @min 0
 * @max 255
 * @default 255
 * @text Opacity
 * @desc Opacity level of the picture.
 *
 * @arg blendMode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 * @text Blend Mode
 * @desc Blend mode used when picture is drawn.
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @default 0
 * @text Fade Time
 * @desc Fade in time in frames.
 *
 * @arg easing
 * @type select
 * @option Constant speed
 * @value 0
 * @option Slow start
 * @value 1
 * @option Slow end
 * @value 2
 * @option Slow start and end
 * @value 3
 * @default 0
 * @text Easing
 * @desc Easing type if fade is used.
 *
 * @command movePicture
 * @text Move Picture
 * @desc Move and/or set other properties with smooth animation.
 *
 * @arg pictureId
 * @type number
 * @decimals 0
 * @default 1
 * @text Picture Id
 * @desc Picture id.
 *
 * @arg origin
 * @type select
 * @option Upper-Left
 * @value 0
 * @option Center
 * @value 1
 * @default 0
 * @text Origin
 * @desc Origin point of the picture.
 *
 * @arg x
 * @type number
 * @decimals 0
 * @default 0
 * @text X
 * @desc X coordinate of the picture.
 *
 * @arg y
 * @type number
 * @decimals 0
 * @default 0
 * @text Y
 * @desc Y coordinate of the picture.
 *
 * @arg scaleX
 * @type number
 * @decimals 0
 * @min 0
 * @max 10000
 * @default 100
 * @text Width
 * @desc Horizontal scale of the picture.
 *
 * @arg scaleY
 * @type number
 * @decimals 0
 * @min 0
 * @max 10000
 * @default 100
 * @text Height
 * @desc Vertical scale of the picture.
 *
 * @arg opacity
 * @type number
 * @decimals 0
 * @min 0
 * @max 255
 * @default 255
 * @text Opacity
 * @desc Opacity level of the picture.
 *
 * @arg blendMode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 * @text Blend Mode
 * @desc Blend mode used when picture is drawn.
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @default 0
 * @text Fade Time
 * @desc Fade in time in frames.
 *
 * @arg easing
 * @type select
 * @option Constant speed
 * @value 0
 * @option Slow start
 * @value 1
 * @option Slow end
 * @value 2
 * @option Slow start and end
 * @value 3
 * @default 0
 * @text Easing
 * @desc Easing type if fade is used.
 *
 * @command tintPicture
 * @text Tint Picture
 * @desc Tint picture.
 *
 * @arg pictureId
 * @type number
 * @decimals 0
 * @default 1
 * @text Picture id
 * @desc Picture id.
 *
 * @arg red
 * @type number
 * @decimals 0
 * @min -255
 * @max 255
 * @default 0
 * @text Red
 * @desc Red color amount.
 *
 * @arg green
 * @type number
 * @decimals 0
 * @min -255
 * @max 255
 * @default 0
 * @text Green
 * @desc Green color amount.
 *
 * @arg blue
 * @type number
 * @decimals 0
 * @min -255
 * @max 255
 * @default 0
 * @text Blue
 * @desc Blue color amount.
 *
 * @arg gray
 * @type number
 * @decimals 0
 * @min 0
 * @max 255
 * @default 0
 * @text Gray
 * @desc Gray color amount.
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @default 0
 * @text Fade Time
 * @desc Fade out time in frames.
 *
 * @command rotatePicture
 * @text Rotate Picture
 * @desc Rotate picture.
 *
 * @arg pictureId
 * @type number
 * @decimals 0
 * @default 1
 * @text Picture id
 * @desc Picture id.
 *
 * @arg speed
 * @type number
 * @decimals 0
 * @default 1
 * @text Speed
 * @desc Rotation speed.
 *
 * @command erasePicture
 * @text Erase Picture
 * @desc Erase picture (even with smooth fade!).
 *
 * @arg pictureId
 * @type number
 * @decimals 0
 * @default 1
 * @text Picture id
 * @desc Picture id.
 *
 * @arg duration
 * @type number
 * @decimals 0
 * @default 0
 * @text Fade Time
 * @desc Fade out time in frames.
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Layer image directory
 * @desc From where to load layer images?
 * Default: img/pictures/
 * @type text
 * @default img/pictures/
 *
 * @param Dynamic layer defaults
 * @desc Use these values for dynamic layers if parameter is ommited in JS call.
 *  
 * @param Z-index
 * @parent Dynamic layer defaults
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @desc What is the z-index of this layer?
 * @default 3
 * 
 * @param Opacity
 * @parent Dynamic layer defaults
 * @desc Default opacity for new layers?
 * Default: 255 (min:0, max:255)
 * @type number
 * @max 255
 * @min 0
 * @default 255
 * 
 * @param Fixed to map
 * @parent Dynamic layer defaults
 * @desc Fixed to map = true, Fixed to screen = false
 * Fixed to screen will move layer WITH player.
 * @type boolean
 * @default true
 * 
 * @param ScrollX
 * @parent Dynamic layer defaults
 * @desc Shift layer x-anchor in pixels (per frame)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 *
 * @param ScrollY
 * @parent Dynamic layer defaults
 * @desc Shift layer y-anchor in pixels (per frame)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 *
 * @param LoopX
 * @parent Dynamic layer defaults
 * @desc Shift layer x-anchor in pixels (when player moves horizontally)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 *
 * @param LoopY
 * @parent Dynamic layer defaults
 * @desc Shift layer y-anchor in pixels (when player moves vertically)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 * 
 * @param Fade time
 * @parent Dynamic layer defaults
 * @desc Adjusts layer default fade out and fade in time per frame.
 * Default: 255 (min:0.01, max:255.00 (instant))
 * @type number
 * @max 255
 * @min 0.01
 * @decimals 2
 * @default 255
 * 
 * @param Inherited to battle
 * @parent Dynamic layer defaults
 * @desc Fixed to map = true, Fixed to screen = false
 * Fixed to screen will move layer WITH player.
 * @type boolean
 * @default true
 * 
 * @param Clear on transfer
 * @parent Dynamic layer defaults
 * @desc Clear layer when transfered to another map.
 * @type boolean
 * @text Clear on transfer
 * @default false
 * 
 * @param Template layers
 * @type struct<Layers>[]
 * @desc Templates makes layer plugin command easier to use. All templates with same name will apply at the same time!
 * @default []
 * 
 * @param Title layers
 * @type struct<TitleLayers>[]
 * @desc These layers are applied to title screen.
 * @default []
 * 
 * @param Use only parallax mapping
 * @type boolean
 * @desc If this parameter is on/true normal tilemapping will be
 * disabled! This will give nice speed-up in parallax mapping!
 * @default false
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * Use ULTRA light weighted and fast OcRam parallax layers to add static 
 * layers. These layers are specifically designed for parallax mapping!
 * 
 * It is recommended to do "Ground" parallax "normal way" in editor
 * (set map parallax with !prefix). This will give you 1 extra layer and
 * possibility to preview of ground layer in RMMZ editor. Just remember that
 * minimum layer size is same as your screen size.
 * 
 * In addition you will get *unlimited amount of OcRam_Layers! These layers 
 * will allow scrolling, looping, fading and much more!
 * 
 * Display layers like 'shadows', 'fog', 'sand-/snow storms', 'sunrays' or 
 * '2.5d side scrollers' - OcRam_Layers can be inherited to battle screen.
 * 
 * *unlimited = Plugin itself won't limit amount of layers. The more layers
 *              are in use the more resources your game will require !!!
 *
 * Parallax layers:
 * - Don't have scroll, loop, fade nor offset params
 * - And they are ALWAYS fixed to map and are cleared on new map or battle
 * - Can be applied only to map scene
 * 
 * Dynamic layers:
 * - Have scroll, loop, fade, offset and fix to map params
 * - Can persists over transfer and battle
 * - Can be applied to map-, battle- and title scenes!
 * 
 * This plugin also offers plugin commands to show, move, tint, rotate and
 * erase pictures! Mainly implemented for OcRam_Weather_System to show some
 * neat weather support effects like hue changing sunrays!
 * 
 * NOTE: All pictures created with this plugin are also inherited to battle!
 * 
 * ----------------------------------------------------------------------------
 * Plugin Commands
 * ============================================================================
 *
 * zIndex values:
 *    0 = Behind parallax
 *    1 = Behind tileset
 *    2 = Behind characters
 *    3 = Above characters
 *    4 = Behind weather
 *    5 = Above all
 *
 * Easing types:
 *    0 = Constant speed
 *    1 = Slow start
 *    2 = Slow end
 *    3 = Slow start and end
 * 
 * Blend modes:
 *    0 = Normal
 *    1 = Additive
 *    2 = Multiply
 *    3 = Screen
 * 
 * MV example: OcRam_Layers/setParallax map[mapId]ground 2 0 0
 * setParallax         Create ULTRA light weighted parallax layer!
 * >> imageName        Image name. [mapId], [tilesetId], [var:X] can be used!
 * >> zIndex           Z-index
 * >> animFrames       Animation frames
 * >> animRate         Animation frames per second.
 * 
 * MV example: OcRam_Layers/setLayer Fog
 * setLayer            Create dynamic layer from TEMPLATES
 * >> templateName     Template name EXACTLY as it is.
 * 
 * MV example: OcRam_Layers/setCustomLayer 
 * 3 fog 1 true 1.2 0.2 0.1 0 0 0 0 3 250 true false
 * setCustomLayer      Create CUSTOM dynamic layer with parameters
 * >> zIndex           Z-index
 * >> imageName        Image name.
 * >> opacity          Opacity. 0 - 1 (4 decimals)
 * >> fixToMap         Fix layer to the map?
 * >> fader            Opacity/frame. 255 = Instant, 1 = Slow, 0.1 = Mega Slow
 * >> scrollX          Scroll X.
 * >> scrollY          Scroll Y.
 * >> loopX            Loop X.
 * >> loopY            Loop Y.
 * >> offsetX          Offset X.
 * >> offsetY          Offset X.
 * >> animFrames       Animation frames
 * >> animRate         Animation frames per second.
 * >> battleLayer      Is this layer inherited to battle scene?
 * >> clearOnTransfer  Clear layer on player transfer?
 * 
 * MV example: OcRam_Layers/clearLayer fog -1 1
 * clearLayer          Clear desired layer(s)
 * >> imageName        Clear all layers with this 'Image name'. Empty = ALL
 * >> zIndex           Z-index
 * >> fader            Opacity/frame. 255 = Instant, 1 = Slow, 0.1 = Mega Slow
 * 
 * MV example: OcRam_Layers/showPicture 1 sunrays 0 0 0 100 100 255 2 4 0
 * showPicture         Show picture with plugin command (shown in battle also)
 * >> pictureId        Picture id.
 * >> pictureName      Picture name.
 * >> origin           0 = Upper left, 1 = Center
 * >> x                X coordinate of the picture.
 * >> y                Y coordinate of the picture.
 * >> scaleX           Horizontal scale of the picture. 0 - 10000
 * >> scaleY           Vertical scale of the picture. 0 - 10000
 * >> opacity          Opacity level of the picture. 0 - 255
 * >> blendMode        Blend mode used when picture is drawn.
 * >> duration         Fade in time in frames.
 * >> easing           Easing type if fade is used.
 * 
 * MV example: OcRam_Layers/movePicture 1 0 0 0 100 100 120 2 4 0
 * movePicture         Move or set picture parameters with easing animation
 * >> pictureId        Picture id.
 * >> origin           0 = Upper left, 1 = Center
 * >> x                X coordinate of the picture.
 * >> y                Y coordinate of the picture.
 * >> scaleX           Horizontal scale of the picture. 0 - 10000
 * >> scaleY           Vertical scale of the picture. 0 - 10000
 * >> opacity          Opacity level of the picture. 0 - 255
 * >> blendMode        Blend mode used when picture is drawn.
 * >> duration         Fade in time in frames.
 * >> easing           Easing type if fade is used.
 * 
 * MV example: OcRam_Layers/tintPicture 1 -10 255 -10 0 4
 * tintPicture         Tint picture (over time if needed)
 * >> pictureId        Picture id.
 * >> red              Value of red. -255 to 255
 * >> green            Value of green. -255 to 255
 * >> blue             Value of blue. -255 to 255
 * >> gray             Value of gray. -255 to 255
 * >> duration         Fade in time in frames.
 * 
 * MV example: OcRam_Layers/rotatePicture 1 -1
 * rotatePicture       Rotate picture
 * >> pictureId        Picture id.
 * >> speed            Rotation speed.
 * 
 * MV example: OcRam_Layers/erasePicture 1 4
 * erasePicture        Erase picture (with fade out if needed)
 * >> pictureId        Picture id.
 * >> duration         Fade in time in frames.
 * 
 * ----------------------------------------------------------------------------
 * JS calls
 * ============================================================================
 *
 *    // Initialize parallax layer (static non-scrolling/-looping/-fading)
 *    $gameScreen.setParallax(z, img_name, [anim_frames, anim_rate]);
 *
 *    // Initialize CUSTOM layer
 *    $gameScreen.setLayer(z, img_name, opacity, fix_to_map, fade_time, 
 *    battle_layer, clear_on_transfer, scroll, loop, anim, offset);
 *      
 *    // Clear layers with desired img_name and/or z-index (-1 = all)
 *    $gameScreen.clearLayer(img_name, z_index, fade);
 *
 *    // Get all layer template objects by name
 *    OcRam.Layers.getTemplatesByName(name)
 *    
 *    // Get all parallax layers as object array
 *    OcRam.Layers.getParallaxLayers()
 *    
 *    // Get all dynamic layers as oject array
 *    OcRam.Layers.getDynamicLayers()
 *    
 *    // Get all dynamic layers by image name
 *    OcRam.Layers.byName(name)
 *    
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/09/19 v1.00 - Initial release
 * 2020/09/27 v1.01 - Some picture plugin command bug fixes + battle pics
 *                    Compatibility patch to OcRam_Passages
 *                    + VisuMZ compatibility patch
 * 2021/06/04 v1.02 - RETRO'ed for RMMV! (Credits to Drakkonis)
 * 2021/10/21 v1.03 - Changed opacity to 2 decimals and range to 0-255
 *                    "Layer image directory" last slash (/) is now optional
 * 2021/12/01 v1.04 - Support for even more dynamic TITLE layers!
 *                    (used with OcRam_Weather_System for example)
 *                    this.findLayer(img, z) // Find first layer with this 
 *                    image name and z-index. Ommit z for any layer.
 * 2022/01/23 v1.05 - Layer init can be called only twice per second.
 *                    Seamless map transfer layers with OcRam_Map_Transfer!
 * 2022/04/22 v1.06 - Title layers now resets x/y to 0 when re-created!
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * IF using parallax mapping only, following overrides are done:
 *      Tilemap.prototype._addAllSpots (if MZ)
 *      Tilemap.prototype._paintAllTiles (if MV)
 *      ShaderTilemap.prototype._paintAllTiles (if MV)
 *      Spriteset_Map.prototype.createTilemap
 */
/*~struct~Layers:
 * 
 * @param templateName
 * @desc Use this name in plugin command: layer my_template
 * Only alpha characters are allowed (a-Z) + under score (_)
 * @text Template name
 * @default my_template
 *
 * @param zIndex
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @text Z-Index
 * @desc What is the z-index of this layer?
 * @default 3
 * 
 * @param imageName
 * @desc The name of the image set as layer background.
 * @text Image name
 * @default my_image
 * 
 * @param opacity
 * @type number
 * @max 255
 * @min 0
 * @desc Opacity for this template.
 * @text Opacity
 * @default 255
 *
 * @param fixToMap
 * @type boolean
 * @desc true = fixed to map // false = fixed to screen.
 * @text Fixed To Map
 * @default false
 * 
 * @param fader
 * @type number
 * @max 255.00
 * @min 0.01
 * @decimals 2
 * @text Fader
 * @desc Gain X opacity per frame
 * @default 255.00
 *
 * @param scrollX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 * @text ScrollX
 * @desc Scroll layer horizontally n pixels per frame.
 * 
 * @param scrollY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 * @text ScrollY
 * @desc Scroll layer vertically n pixels per frame.
 * 
 * @param loopX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 * @text LoopX
 * @desc Scroll layer horizontally n pixels, but only when player moves horizontally.
 *
 * @param loopY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 2
 * @default 0.00
 * @text LoopY
 * @desc Scroll layer vertically n pixels, but only when player moves vertically.
 * 
 * @param animFrames
 * @type number
 * @decimals 0
 * @max 99
 * @min 0
 * @text Anim Frames
 * @desc How many animation frames this layer has? (see help for naming image files)
 * @default 0
 * 
 * @param animRate
 * @type number
 * @decimals 0
 * @max 99999
 * @min 0
 * @text Anim Rate
 * @desc How many ms there is between animation frames?
 * @default 0
 * 
 * @param offsetX
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text offsetX
 * @desc Layer horizontal offset.
 *
 * @param offsetY
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text OffsetY
 * @desc Layer vertical offset.
 * 
 * @param battleLayer
 * @type boolean
 * @default true
 * @text Inherit to battle
 * @desc Inherit layer to battle?
 * 
 * @param clearOnTransfer
 * @desc Clear layer when transfered to another map.
 * @type boolean
 * @text Clear on transfer
 * @default false
 */
/*~struct~TitleLayers:
 *
 * @param zIndex
 * @type select
 * @option Behind title bg1
 * @value 0
 * @option Above title bg1
 * @value 1
 * @option Above all
 * @value 2
 * @text Z-Index
 * @desc What is the z-index of this layer?
 * @default 1
 *
 * @param imageName
 * @desc The name of the image set as layer background.
 * @text Image name
 * @default my_image
 *
 * @param opacity
 * @type number
 * @max 255
 * @min 0
 * @desc Opacity for this template.
 * @text Opacity
 * @default 255
 *
 * @param fader
 * @type number
 * @max 255.00
 * @min 0.01
 * @decimals 2
 * @text Fader
 * @desc Gain X opacity per frame
 * @default 255.00
 *
 * @param scrollX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @text ScrollX
 * @desc Scroll layer horizontally n pixels per frame.
 * @default 0.000
 *
 * @param scrollY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @text ScrollY
 * @desc Scroll layer vertically n pixels per frame.
 * @default 0.000
 *
 * @param animFrames
 * @type number
 * @decimals 0
 * @max 99
 * @min 0
 * @text Anim Frames
 * @desc How many animation frames this layer has? (see help for naming image files)
 * @default 0
 *
 * @param animRate
 * @type number
 * @decimals 0
 * @max 99999
 * @min 0
 * @text Anim Rate
 * @desc How many ms there is between animation frames?
 * @default 0
 *
 * @param offsetX
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text offsetX
 * @desc Layer horizontal offset.
 *
 * @param offsetY
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text OffsetY
 * @desc Layer vertical offset.
 * 
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    let tmp_d = String(this.parameters['Layer image directory'] || 'img/pictures/').trim();
    if (tmp_d.right(1) != "/") tmp_d += "/"; const _layerImgDir = tmp_d; tmp_d = null;

    const _defaultFadeTime = OcRam.getFloat(this.parameters['Fade time']);
    const _defaultOpacity = Number(this.parameters['Opacity']);
    const _defaultLoopX = OcRam.getFloat(this.parameters['LoopX'] || 0);
    const _defaultLoopY = OcRam.getFloat(this.parameters['LoopY'] || 0);
    const _defaultScrollX = OcRam.getFloat(this.parameters['ScrollX'] || 0);
    const _defaultScrollY = OcRam.getFloat(this.parameters['ScrollY'] || 0);
    const _defaultFixedToMap = OcRam.getBoolean(this.parameters['Fixed to map']);
    const _defaultZindex = parseInt(this.parameters['Z-index'] || 3);
    const _defaultBattle = OcRam.getBoolean(this.parameters['Inherited to battle']);
    const _defaultClearOnTransfer = OcRam.getBoolean(this.parameters['Clear on transfer']);
    let _useOnlyParallaxMapping = OcRam.getBoolean(this.parameters['Use only parallax mapping']);

    const _layerTemplates = OcRam.getJSON(this.parameters['Template layers']) || [];
    const _titleLayersParam = OcRam.getJSON(this.parameters['Title layers']) || [];

    let _gameSysLoading = false;
    let _parallaxLayers = []; // Layer array
    let _dynamicLayers = []; // Layer array
    let _prevDiffX = 0; let _prevDiffY = 0;

    // Parallax or not to parallax. Orginal core functions saved here...
    let _Orginal_Tilemap_addAllSpots = Tilemap.prototype._addAllSpots;
    let _Orginal_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;

    // For MV compatibility
    let _Orginal_ShaderTilemap_paintAllTiles = null;
    let _Orginal_Tilemap_paintAllTiles = null;
    if (!OcRam.isMZ()) {
        _Orginal_ShaderTilemap_paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
        _Orginal_Tilemap_paintAllTiles = Tilemap.prototype._paintAllTiles;
    }

    let _titleLayers = []; let _battlePics = [];

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    const getDynamicName = (img_name) => {

        // DYNAMIC NAMES HERE
        if ($gameMap) {
            img_name = (img_name + '').replaceAll("\[mapId\]", $gameMap._mapId.toString().padZero(3));
            img_name = (img_name + '').replaceAll("\[mapid\]", $gameMap._mapId.toString().padZero(3));
            if (!DataManager.isEventTest()) {
                img_name = (img_name + '').replaceAll("\[tilesetId\]", $gameMap._tilesetId.toString().padZero(3));
                img_name = (img_name + '').replaceAll("\[tilesetid\]", $gameMap._tilesetId.toString().padZero(3));
            } else {
                img_name = (img_name + '').replace("\[tilesetId\]", "0".padZero(3));
                img_name = (img_name + '').replace("\[tilesetid\]", "0".padZero(3));
            }
        }

        let varid = img_name.match(/\[var\:(.*?)\]/);
        if (varid) {
            if (varid.length > 0) {
                varid = parseInt(varid[1]);
                img_name = img_name.replace(/\[var\:(.*?)\]/, $gameVariables.value(varid));
            }
        }

        return img_name;

    };

    const clearOnTransfer = () => {
        _dynamicLayers.forEach(layer => {
            if (layer._clearOnTransfer) {
                layer.clear(255); clearOnTransfer();
            }
        });
    };

    const clearLayer = (img_name, z_index, fade) => {

        this.debug("clearLayer:", img_name, z_index, fade);

        _parallaxLayers.forEach(layer => {
            if (String(img_name) == layer._imgName) {
                layer.clear(fade);
            } else if (Number(z_index) != -1 && z_index == layer._z) {
                layer.clear(fade);
            }
        });

        _dynamicLayers.forEach(layer => {
            if (!layer._fadeOut) {
                if (String(img_name) == layer._imgName) {
                    layer.clear(fade);
                } else if (Number(z_index) != -1 && Number(z_index) == layer._z) {
                    layer.clear(fade);
                }
            }
        });

        _titleLayers.forEach(layer => {
            if (!layer._fadeOut) {
                if (String(img_name) == layer._imgName) {
                    layer.clear(fade);
                } else if (Number(z_index) != -1 && Number(z_index) == layer._z) {
                    layer.clear(fade);
                }
            }
        });

    };

    const useParallaxMapping = () => {

        this.debug("USE ONLY PARALLAX MAPPING", "!!!"); this._usingParallax = true;
        
        if (OcRam.isMZ()) {
            Tilemap.prototype._addAllSpots = function (startX, startY) { };
            Spriteset_Map.prototype.createTilemap = function () {
                const tilemap = new Tilemap();
                tilemap.tileWidth = $gameMap.tileWidth();
                tilemap.tileHeight = $gameMap.tileHeight();
                tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
                tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
                tilemap.verticalWrap = $gameMap.isLoopVertical();
                this._baseSprite.addChild(tilemap);
                this._effectsContainer = tilemap;
                this._tilemap = tilemap;
                //this.loadTileset(); // Do not even load tileset
            };
        } else {
            ShaderTilemap.prototype._paintAllTiles = function (startX, startY) { };
            Tilemap.prototype._paintAllTiles = function (startX, startY) { };
            Spriteset_Map.prototype.createTilemap = function () {
                if (Graphics.isWebGL()) {
                    this._tilemap = new ShaderTilemap();
                } else {
                    this._tilemap = new Tilemap();
                } this._tilemap.tileWidth = $gameMap.tileWidth();
                this._tilemap.tileHeight = $gameMap.tileHeight();
                this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
                this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
                this._tilemap.verticalWrap = $gameMap.isLoopVertical();
                // this.loadTileset(); // Do not even load tileset
                this._baseSprite.addChild(this._tilemap);
            };
        }

    };

    const useTileMapping = () => {
        this.debug("Using normal way to draw tilemaps.", "(no parallax mapping optimization)");
        this._usingParallax = false;
        if (OcRam.isMZ()) {
            Spriteset_Map.prototype.createTilemap = function () {
                _Orginal_Spriteset_Map_createTilemap.call(this);
            }; Tilemap.prototype._addAllSpots = function (startX, startY) {
                _Orginal_Tilemap_addAllSpots.call(this, startX, startY);
            };
        } else {
            Spriteset_Map.prototype.createTilemap = function () {
                _Orginal_Spriteset_Map_createTilemap.call(this);
            }; ShaderTilemap.prototype._paintAllTiles = function (startX, startY) {
                _Orginal_ShaderTilemap_paintAllTiles.call(this, startX, startY);
            }; Tilemap.prototype._paintAllTiles = function (startX, startY) {
                _Orginal_Tilemap_paintAllTiles.call(this, startX, startY);
            };
        }
    };

    const setParallax = (z, img_name, opacity, anim) => {

        if (!opacity) opacity = 255;
        if (!anim) anim = [0, 0];
        const offset = [0, 0];

        img_name = getDynamicName(img_name);

        _this.debug("REGULATED VALUES: setParallax", "z=" + z + ", img_name=" + img_name + ", opacity=" + opacity + ", anim=" + anim);
        let this_layer = new OcRam_Parallax(z, img_name, opacity, anim, offset, 255, false);
        _parallaxLayers.push(this_layer); return this_layer;

    };

    const setLayer = (z, img_name, opacity, fix_to_map, fade_time, battle_layer, clear_on_transfer, scroll, loop, anim, offset) => {

        img_name = getDynamicName(img_name);

        _this.debug("REGULATED VALUES: setLayer", "z=" + z + ", img_name=" + img_name + ", opacity=" + opacity + ", fix_to_map=" + fix_to_map + ", fade_time=" + fade_time + ", battle_layer=" + battle_layer + ", clear_on_transfer=" + clear_on_transfer + ", scroll=" + scroll + ", loop=" + loop + ", anim=" + anim + ", offset=" + offset + "");
        let this_layer = new OcRam_Layer(z, img_name, opacity, fix_to_map, fade_time, battle_layer, clear_on_transfer, scroll, loop, anim, offset, false);
        if (OcRam.scene().isTitle()) {
            _titleLayers.push(this_layer);
        } else {
            _dynamicLayers.push(this_layer);
        } return this_layer;

    };

    const removeBattlePic = pictureId => {
        _battlePics.forEach(pic => {
            if (pic[0] == pictureId) {
                _battlePics.remove(pic); removeBattlePic(pictureId);
            }
        });
    };

    const parseTitleLayersParam = () => {
        let tl = null; let nl = null;
        _titleLayers = [];
        _titleLayersParam.forEach(tl_obj => {
            tl = JSON.parse(tl_obj);
            nl = new OcRam_Layer(
                Number(tl.zIndex), String(tl.imageName),
                Number(tl.opacity), OcRam.getBoolean(tl.fixToMap),
                OcRam.getFloat(tl.fader), false, true,
                [OcRam.getFloat(tl.scrollX), OcRam.getFloat(tl.scrollY)],
                [0, 0], [Number(tl.animFrames), Number(tl.animRate)],
                [Number(tl.offsetX), Number(tl.offsetY)], true
            ); _titleLayers.push(nl);
        });
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction()
    // ==============================================================================

    // Getters from private scope...
    this.getDynamicLayers = () => _dynamicLayers;
    this.getTitleLayers = () => _titleLayers;
    this.getParallaxLayers = () => _parallaxLayers;

    if (_useOnlyParallaxMapping) {
        this.parallaxOptimization = function () { return true; };
        useParallaxMapping();
    } else {
        this.parallaxOptimization = function () { return false; };
        useTileMapping();
    }

    this.clearOnNewTitle = () => {
        for (let i = 0; i < _titleLayers.length; i++) {
            const layer = _titleLayers[i]; layer.clear(255);
        }
    };

    this.clearEveryThing = () => {
        _titleLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
            layer.destroyBase(_titleLayers);
        }); _titleLayers = [];
        _dynamicLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
            layer.destroyBase(_dynamicLayers);
        }); _dynamicLayers = [];
        _parallaxLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
            layer.destroyBase(_parallaxLayers);
        }); _parallaxLayers = []; _battlePics = [];
    };

    this.deleteDynamicLayers = () => {
        _dynamicLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
            layer.destroyBase(_dynamicLayers);
        }); _dynamicLayers = [];
    };

    this.getTemplatesByName = name => {
        let found_obj = [];
        _layerTemplates.forEach(template => {
            let template_object = JSON.parse(template);
            if ((template_object.templateName + '').toLowerCase() == (name + '').toLowerCase()) {
                found_obj.push(template_object);
            }
        }); return found_obj;
    };

    this.byName = name => {
        let tmp = [];
        _dynamicLayers.forEach(layer => {
            if ((layer._imgName + '').toLowerCase() == (name + '').toLowerCase()) {
                tmp.push(tmp);
            }
        }); return tmp;
    };

    this.clearAllLayers = (fade) => {
        fade = Number(fade || 0);
        _parallaxLayers.forEach(l => {
            l.clear(fade);
        }); _dynamicLayers.forEach(l => {
            l.clear(fade);
        }); _titleLayers.forEach(l => {
            l.clear(fade);
        });
    };

    this.setTitleLayers = new_layers => {

        // New layers must be passed as in plugin parameter "Title layers"!
        new_layers = OcRam.getArray(new_layers);

        // Just to make sure every layer is destroyed...
        _this.clearOnNewTitle(); _titleLayers = [];

        let tl = null; let nl = null;
        new_layers.forEach(tl_obj => {
            tl = tl_obj;
            nl = new OcRam_Layer(
                Number(tl.zIndex), String(tl.imageName),
                Number(tl.opacity), OcRam.getBoolean(tl.fixToMap),
                OcRam.getFloat(tl.fader), false, true,
                [OcRam.getFloat(tl.scrollX), OcRam.getFloat(tl.scrollY)],
                [0, 0], [Number(tl.animFrames), Number(tl.animRate)],
                [Number(tl.offsetX), Number(tl.offsetY)], true
            ); _titleLayers.push(nl);
        });

        const scene = OcRam.scene();
        if (scene.isTitle()) {
            _titleLayers.forEach(layer => {
                layer.initLayer(scene);
            });
        }

    };

    this.findLayer = (layer_name, z_index) => {
        if (z_index === undefined || z_index < 0) {
            return _dynamicLayers.find(l => {
                return (l._imgName + "").toLowerCase() == (layer_name + "").toLowerCase();
            });
        } else {
            return _dynamicLayers.find(l => {
                return (l._imgName + "").toLowerCase() == (layer_name + "").toLowerCase() && l._z == z_index;
            });
        }
    };

    // ------------------------------------------------------------------------------
    // Plugin Classes
    // ==============================================================================

    /** Basic layer ultra light and fast (always fixed to map / no scroll nor loop / cleared always in transfers to another map and battle) */
    class OcRam_Parallax {

        constructor(zindex, img_name, opacity, anim, offset, fade, no_init) {

            // PROPERTIES
            this._initialized = false;
            this._imgName = img_name;
            this._wasTitleLayer = OcRam.scene() ? OcRam.scene().isTitle() : false;

            if (!$gameMap) {
                this._x = 0; this._y = 0;
            } else {
                this._x = ($gameMap._displayX * OcRam.twh[0]);
                this._y = ($gameMap._displayY * OcRam.twh[1]);
            }

            this._z = Number(zindex);
            this._opacity = Number(opacity);
            this._animFrames = Number(anim[0]);
            this._animRate = Number(anim[1]);
            this._fader = fade || 255;

            // Init + append to map or title
            this._initDone = false;
            if (!no_init) this.initLayer();
            
            requestAnimationFrame(() => { this._initialized = true; });

        }

        initLayer(container) {

            if (this._initDone) return;
            setTimeout(() => {
                this._initDone = false;
            }, 500); this._initDone = true;

            if (OcRam.scene().isTitle()) container = OcRam.scene();

            this.initSprite();

            // Use these to optimize very critical scroll operation (we eliminate 3 if clauses this way!!!)
            if (this._newAnimRate < 6) this._newAnimRate = 6; // Capped to ~160fps
            if (this._animate) clearInterval(this._animate); // Clear any previous animation intervals!

            if (this._animFrames > 0) { // NEW ANIMATED LAYER

                this._currentFrame = 0; this._animBitmaps = [];

                for (let i = 1; i < this._animFrames + 1; i++) {
                    this._animBitmaps.push(ImageManager.loadOC_Layer(this._imgName + i.toString().padZero(2)));
                }

                this._sprite.bitmap = this._animBitmaps[0]; // Load already first image

                this._animate = setInterval(() => {
                    this._currentFrame = (this._currentFrame + 1) % this._animFrames;
                    this._sprite.bitmap = this._animBitmaps[this._currentFrame];
                }, this._animRate);

            } else { // NOT ANIMATED LAYER
                this._animate = null;
                this._sprite.bitmap = ImageManager.loadOC_Layer(this._imgName);
            }

            if (this._fader == 255 || this._initialized) {
                this._sprite.opacity = this._opacity;
            } else {
                this._sprite.opacity = 0;
            }

            if (!container) {
                this.appendToMap();
            } else {
                if (container.isBattle()) {
                    container._baseSprite.addChild(this._sprite);
                } else if (container.isTitle()) {
                    this.appendToTitle(container);
                }
            }

        }

        initSprite() {
            this._sprite = new TilingSprite(); this._sprite.opacity = 0;
            if (Imported.OcRam_Map_Transfer && OcRam.Map_Transfer.isTransfering()) {
                const bm = ImageManager.loadOC_Layer(this._animFrames > 0 ? this._imgName + "01" : this._imgName);
                const tw = (bm.width) | 0; const th = (bm.height) | 0;
                const ld = OcRam.Map_Transfer.getLayerData(this._imgName, this._z);
                if (ld) { // Get previous layer origin and try to ensure "seemless" transition
                    _this.debug("Map_Transfer Layer data (and layer tiling bitmap width x height):", ld, tw, "x", th);
                    this._scrollX = 0; this._scrollY = 0;
                    switch (ld.data[3]) {
                        case 6: this._x = (Graphics.width % tw) + (ld.data[0].x); this._y = (ld.data[0].y); break;
                        case 4: this._x = (ld.data[0].x) - (Graphics.width % tw); this._y = (ld.data[0].y); break;
                        case 8: this._x = (ld.data[0].x); this._y = (ld.data[0].y) - (Graphics.height % th); break;
                        case 2: this._x = (ld.data[0].x); this._y = (Graphics.height % th) + (ld.data[0].y); break;
                        default: this._x = (ld.data[0].x); this._y = (ld.data[0].y); break;
                    } this._sprite.origin.x = (this._x);
                    this._sprite.origin.y = (this._y);
                } else {
                    this._sprite.origin.x = 0; this._sprite.origin.y = 0;
                } if (OcRam.scene()._spriteset) OcRam.scene()._spriteset.update();
                this._sprite.update();
            } else {
                this._sprite.origin.x = 0; this._sprite.origin.y = 0;
            } this._sprite.move(0, 0, Graphics.width, Graphics.height);
        }

        appendToTitle(spriteset) {

            if (!spriteset) return;

            // This is some neat stuff you can do with JS :D
            // Anonymous function with spriteset bound as 'this' and 'this' layer class is passed as parameter
            (function (layer) {

                let sprite_index = 0; // this._gameTitleSprite
                let layer_cont = this._spriteset || this;

                switch (layer._z) {
                    case 0: // Below _backSprite1
                        if (layer_cont.isTitle) {
                            layer_cont.addChildAt(layer._sprite, 0);
                        } else {
                            layer_cont.addChildAt(layer._sprite, 1);
                        } _this.debug("Below _backSprite1", this); break;
                    case 1: // Below _backSprite2
                        sprite_index = layer_cont.children.indexOf(this._backSprite1);
                        layer_cont.addChildAt(layer._sprite, sprite_index + 1);
                        _this.debug("Below _backSprite2", this); break;
                    default: // Above _backSprite2
                        if (Imported.OcRam_Title_Shuffler) {
                            sprite_index = layer_cont.children.indexOf(this._backSprite1);
                            layer_cont.addChildAt(layer._sprite, sprite_index + 1);
                            _this.debug("Below _backSprite2", this);
                        } else {
                            sprite_index = layer_cont.children.indexOf(this._backSprite2);
                            if (sprite_index < 0) {
                                sprite_index = this.children.indexOf(this._backSprite2);
                                this.addChildAt(layer._sprite, sprite_index + 1);
                            } else {
                                layer_cont.addChildAt(layer._sprite, sprite_index + 1);
                            } _this.debug("Above _backSprite2", this);
                        } break;
                }

            }.bind(spriteset))(this);

        }

        appendToMap() {

            let spriteset = OcRam.scene(); if (!spriteset) return;
            spriteset = spriteset._spriteset;

            // This is some neat stuff you can do with JS :D
            // Anonymous function with spriteset bound as 'this' and 'this' layer class is passed as parameter
            (function (layer) {

                let parallax_index = 0;

                this._baseSprite.removeChild(this._weather); this._baseSprite.addChild(this._weather);
                const weather_index = this._baseSprite.children.indexOf(this._weather);

                switch (layer._z) {
                    case 0: // Below parallax
                        this._baseSprite.addChildAt(layer._sprite, 1);
                        _this.debug("Below parallax", this._baseSprite); break;
                    case 1: // Below tileset
                        parallax_index = this._baseSprite.children.indexOf(this._parallax);
                        this._baseSprite.addChildAt(layer._sprite, parallax_index + 1);
                        _this.debug("Below tileset", this._baseSprite); break;
                    case 2: // Below characters
                        layer._sprite.z = 1; layer._sprite.spriteId = 0;
                        this._tilemap.addChildAt(layer._sprite, 0);
                        _this.debug("Below characters", this._tilemap); break;
                    case 3: // Above characters (and OcRam_Passages overlay)
                        layer._sprite.z = 8; layer._sprite.spriteId = 9999;
                        this._tilemap.addChildAt(layer._sprite, 0);
                        _this.debug("Above characters", this._tilemap); break;
                    case 4: // Below weather
                        this._baseSprite.addChildAt(layer._sprite, weather_index);
                        _this.debug("Below weather", this._baseSprite); break;
                    case 5: // Most top
                        this._baseSprite.addChild(layer._sprite);
                        _this.debug("Most top", this._baseSprite); break;
                }

            }.bind(spriteset))(this);

        }

        update() {
            if (this._sprite && this._sprite.bitmap) {
                this._sprite.origin.x = this._x;
                this._sprite.origin.y = this._y;
            }
        }

        getLoopPosX(difference) {
            return difference * OcRam.twh[0];
        }

        getLoopPosY(difference) {
            return difference * OcRam.twh[1];
        }

        clear() {
            this._fader = 255; this.destroy();
        }

        destroy() {
            if (this._wasTitleLayer) {
                this.destroyBase(_titleLayers);
            } else {
                this.destroyBase(_parallaxLayers);
            }
        }

        destroyBase(arr) {

            if (this._fader == 255) {

                let spriteset = OcRam.scene();

                if (!spriteset) {
                    arr.remove(this);
                    delete this; return; // No scene?
                } else {
                    spriteset = spriteset._spriteset;
                }

                if (spriteset) {
                    if (spriteset._baseSprite) spriteset._baseSprite.removeChild(this._sprite);
                    if (spriteset._tilemap) spriteset._tilemap.removeChild(this._sprite);
                    spriteset.removeChild(this._sprite);
                } OcRam.scene().removeChild(this._sprite);

                arr.remove(this);
                delete this;
                
            } else { // Init fade out... destroy after actual fade
                this._targetOpacity = 0;
                this._fadeOut = true;
                this.fader = this.fadeOut;
            }
        }

    }

    class OcRam_Layer extends OcRam_Parallax {

        constructor(zindex, img_name, opacity, fix_to_map, fade, battle_layer, clear_on_transfer, scroll, loop, anim, offset, no_init) {

            // fade is here for only 1 reason - Make dynamic layer fade work...
            super(zindex, img_name, opacity, anim, offset, fade, no_init);

            if (this._wasTitleLayer) {
                this._x = 0; this._y = 0;
                fix_to_map = false;
            }

            this._loopX = OcRam.getFloat(loop[0]);
            this._loopY = OcRam.getFloat(loop[1]);
            this._scrollX = OcRam.getFloat(scroll[0]);
            this._scrollY = OcRam.getFloat(scroll[1]);
            this._offsetX = offset[0]; this._offsetY = offset[1];
            this._fixedToMap = fix_to_map; this._fader = fade || 255;
            this._clearOnTransfer = clear_on_transfer;
            this._battleLayer = battle_layer;

            this._x += this._offsetX;
            this._y += this._offsetY;

            if (Imported.OcRam_Map_Transfer) {
                if (OcRam.Map_Transfer.isTransfering()) {
                    const ld = OcRam.Map_Transfer.getLayerData(this._imgName, this._z);
                    if (ld) {
                        this._scrollX = 0;
                        this._scrollY = 0;
                    }
                }
            }

            // Optimize map update per frame!
            // Just call empty functions if no calculations are needed!
            // No extra iffing per frame...
            if (!this._scrollX) this.scrollX = () => { };
            if (!this._scrollY) this.scrollY = () => { };

            this._targetOpacity = this._opacity;

            if (fade != 0 && fade != 255) {
                this._opacity = 0;
                this._fadeOut = false;
                this.fader = this.fadeIn;
            }

            if (this._wasTitleLayer) { // No map scrolling in title screen...
                this.updateFixToMap = () => { };
                this.getLoopPosX = difference => 0;
                this.getLoopPosY = difference => 0;
            } else {
                this.updateFixToMap();
            }

        }

        clear(fade) {
            this._fader = fade || 255;
            this.destroy();
        }

        updateFixToMap() { // This method on init will optimize our layers A LOT!
            if (this._fixedToMap) { // Fixed to map
                if (this._loopX) {
                    this.getLoopPosX = difference => {
                        if (!difference) return 0;
                        return (difference * OcRam.twh[0]) - ((difference < 0) ? -this._loopX : this._loopX);
                    };
                } else {
                    this.getLoopPosX = difference => { return difference * OcRam.twh[0]; };
                }
                if (this._loopY) {
                    this.getLoopPosY = difference => {
                        if (!difference) return 0;
                        return (difference * OcRam.twh[1]) - ((difference < 0) ? -this._loopY : this._loopY);
                    };
                } else {
                    this.getLoopPosY = difference => { return difference * OcRam.twh[1]; };
                }
            } else { // Fixed to screen
                if (this._loopX != 0) {
                    this.getLoopPosX = difference => {
                        if (!difference) return 0;
                        return ((difference < 0) ? this._loopX : -this._loopX);
                    };
                } else {
                    this.getLoopPosX = () => { return 0; };
                } if (this._loopY != 0) {
                    this.getLoopPosY = difference => {
                        if (!difference) return 0;
                        return ((difference < 0) ? this._loopY : -this._loopY);
                    };
                } else {
                    this.getLoopPosY = () => { return 0; };
                }
            }
        }

        fader() { /* do nothing - for now */ }

        fadeOut() {

            this._opacity -= this._fader;
            this._sprite.opacity = this._opacity;

            if (this._opacity <= this._targetOpacity) {
                this._opacity = this._targetOpacity;
                this._sprite.opacity = this._opacity;
                this._fadeOut = false; this.fader = () => { };
                _this.debug("fadeOut complete for layer: ", this);
                this._fader = 255; this.destroy();
            }

        }

        fadeIn() {
            if (this._targetOpacity <= this._opacity) {
                _this.debug("fadeIn complete for layer: ", this);
                this._opacity = this._targetOpacity;
                this._sprite.opacity = this._targetOpacity;
                this.fader = () => { };
            } else {
                this._opacity += this._fader;
                this._sprite.opacity = this._opacity;
            }
        }

        scrollX() {
            this._x += this._scrollX;
        }

        scrollY() {
            this._y += this._scrollY;
        }

        update() { // Little bit heavier update per frame than in OcRam_Parallax
            if (this._sprite && this._sprite.bitmap) {
                this.scrollX(); this.scrollY(); this.fader();
                this._sprite.origin.x = this._x;
                this._sprite.origin.y = this._y;
            }
        }

        destroy() {
            if (this._wasTitleLayer) {
                this.destroyBase(_titleLayers);
            } else {
                this.destroyBase(_dynamicLayers);
            }
        }

    }

    parseTitleLayersParam();

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_Screen.prototype.pictureFadeIn = function (pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode, fade, easing) {

        let realPictureId = this.realPictureId(pictureId); let pic = null;

        if (realPictureId) {
            pic = this._pictures[realPictureId];
            if (pic && pic._OC_Interval) {
                _this.debug("ERASED - Picture:", pic);
                clearInterval(pic._OC_Interval);
            }
        }

        removeBattlePic(pictureId);
        _battlePics.push([pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode]);

        realPictureId = this.realPictureId(pictureId);
        pic = new Game_Picture();
        pic.show(name, origin, x, y, scaleX, scaleY, 0, blendMode);
        this._pictures[realPictureId] = pic;
        if (pic && pic.setAnchor) { // VisuMZ fix...
            pic.setAnchor([{
                'x': 0x0,
                'y': 0x0
            }, {
                'x': 0.5,
                'y': 0.5
                }][origin]);
        } this.movePicture(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, fade || 1, easing);
        
    };

    Game_Screen.prototype.pictureFadeOut = function (pictureId, fade) {

        let realPictureId = this.realPictureId(pictureId);
        let pic = this._pictures[realPictureId];

        if (pic) {
            if (fade) {
                this.movePicture(pictureId, pic._origin, pic._x, pic._y, pic._scaleX, pic._scaleY, 0, pic._blendMode, fade);
                if (pic._OC_Interval) clearInterval(pic._OC_Interval);
                removeBattlePic(pictureId);
                pic._OC_Interval = setInterval(function () {
                    if (this._opacity < 1) {
                        _this.debug("ERASED - Picture:", this);
                        clearInterval(this._OC_Interval);
                        $gameScreen.erasePicture(pictureId);
                    }
                }.bind(pic), 100);
            } else {
                if (pic._OC_Interval) clearInterval(pic._OC_Interval);
                removeBattlePic(pictureId);
                $gameScreen.erasePicture(pictureId);
            }
        }

    };

    // layer indx img_name scrlx scrly opacity fixed_to_map fade loop anim
    Game_Screen.prototype.setLayer = (z, img_name, opacity, fix_to_map, fade_time, battle_layer, clear_on_transfer, scroll, loop, anim, offset) => {

        if (OcRam.isOmitted(z)) z = _defaultZindex;
        if (OcRam.isOmitted(img_name)) img_name = "";
        if (OcRam.isOmitted(opacity)) opacity = _defaultOpacity;
        if (OcRam.isOmitted(fix_to_map)) fix_to_map = _defaultFixedToMap;
        if (OcRam.isOmitted(fade_time)) fade_time = _defaultFadeTime;
        if (OcRam.isOmitted(battle_layer)) battle_layer = _defaultBattle;
        if (OcRam.isOmitted(clear_on_transfer)) clear_on_transfer = _defaultClearOnTransfer;
        if (OcRam.isOmitted(scroll)) scroll = [_defaultScrollX, _defaultScrollY];
        if (OcRam.isOmitted(loop)) loop = [_defaultLoopX, _defaultLoopY];
        if (OcRam.isOmitted(anim)) anim = [0, 0];
        if (OcRam.isOmitted(offset)) offset = [0, 0];

        setLayer(z, img_name, opacity, fix_to_map, fade_time, battle_layer, clear_on_transfer, scroll, loop, anim, offset);

    };

    Game_Screen.prototype.setParallax = (z, img_name, anim, opacity) => {
        setParallax(z, img_name, opacity, anim);
    };

    Game_Screen.prototype.clearLayer = (img_name, z_index, fade) => {
        clearLayer(img_name, z_index, fade);
    };

    Spriteset_Map.prototype.create_OcRam_Layers = function () {
        requestAnimationFrame(() => {
            _parallaxLayers.forEach(layer => {
                layer.initLayer();
            });
            _dynamicLayers.forEach(layer => {
                layer.initLayer();
            });
        });
    };

    // Image loaders for layers
    ImageManager.loadOC_Layer = function (filename) {
        return this.loadBitmap(_layerImgDir, filename, 0, true);
    };

    Game_Map.prototype.scrollY_OC = function (distance, difference) {
        if (this.isLoopVertical()) {
            if (difference > 8) difference = _prevDiffY;
            if (difference < -8) difference = _prevDiffY;
            _prevDiffY = difference;
            _parallaxLayers.forEach(layer => {
                layer._y -= layer.getLoopPosY(difference);
            });
            _dynamicLayers.forEach(layer => {
                layer._y -= layer.getLoopPosY(difference);
            });
        } else if (this.height() >= this.screenTileY()) {
            _parallaxLayers.forEach(layer => {
                layer._y -= layer.getLoopPosY(difference);
            });
            _dynamicLayers.forEach(layer => {
                layer._y -= layer.getLoopPosY(difference);
            });
        }
    };

    Game_Map.prototype.scrollX_OC = function (distance, difference) {
        if (this.isLoopHorizontal()) {
            if (difference > 8) difference = _prevDiffX;
            if (difference < -8) difference = _prevDiffX;
            _prevDiffX = difference;
            _parallaxLayers.forEach(layer => {
                layer._x -= layer.getLoopPosX(difference);
            });
            _dynamicLayers.forEach(layer => {
                layer._x -= layer.getLoopPosX(difference);
            });
        } else if (this.width() >= this.screenTileX()) {
            _parallaxLayers.forEach(layer => {
                layer._x -= layer.getLoopPosX(difference);
            });
            _dynamicLayers.forEach(layer => {
                layer._x -= layer.getLoopPosX(difference);
            });
        }
    };

    Game_System.prototype.saveLayerData = function () {

        this._dynamicLayers = []; this._parallaxLayers = [];
        this._battlePics = _battlePics;
        _dynamicLayers.forEach(layer => {
            let obj = {};
            obj._z = layer._z;
            obj._imgName = layer._imgName;
            obj._opacity = layer._opacity;
            obj._targetOpacity = layer._targetOpacity;
            obj._fixedToMap = layer._fixedToMap;
            obj._fader = layer._fader;
            obj._battleLayer = layer._battleLayer;
            obj._clearOnTransfer = layer._clearOnTransfer;
            obj._scrollX = layer._scrollX;
            obj._scrollY = layer._scrollY;
            obj._loopX = layer._loopX;
            obj._loopY = layer._loopY;
            obj._animFrames = layer._animFrames;
            obj._animRate = layer._animRate;
            obj._offsetX = layer._offsetY;
            obj._offsetY = layer._offsetY;
            obj._x = layer._x; obj._y = layer._y;
            this._dynamicLayers.push(obj);
        });

        _parallaxLayers.forEach(layer => {
            let obj = {};
            obj._z = layer._z;
            obj._imgName = layer._imgName;
            obj._opacity = layer._opacity;
            obj._animFrames = layer._animFrames;
            obj._animRate = layer._animRate;
            obj._x = layer._x; obj._y = layer._y;
            this._parallaxLayers.push(obj);
        });

    };

    Game_System.prototype.loadLayerData = function () {

        _this.debug("loadingLayerData", "parallax", this._parallaxLayers, "dynamic", this._dynamicLayers);

        if (this._battlePics) _battlePics = this._battlePics;

        if (this._dynamicLayers) {
            this._dynamicLayers.forEach(function (l) {
                let nl = setLayer(Number(l._z), l._imgName, l._opacity,
                    l._fixedToMap, l._fader, l._battleLayer, l._clearOnTransfer,
                    [l._scrollX, l._scrollY], [l._loopX, l._loopY],
                    [l._animFrames, l._animRate], [l._offsetX, l._offsetY]);
                nl._x = l._x; nl._y = l._y; nl._opacity = l._opacity;
            });
        }

        if (this._parallaxLayers) {
            this._parallaxLayers.forEach(function (l) {
                setParallax(Number(l._z), l._imgName, l._opacity, [l._animFrames, l._animRate]);
            });
        }

    }; // load data if game system was loading

    Spriteset_Battle.prototype.isBattle = () => { return true; };
    Spriteset_Battle.prototype.isTitle = () => { return false; };
    Scene_Title.prototype.isBattle = () => { return false; };
    Scene_Title.prototype.isTitle = () => { return true; };

    Spriteset_Battle.prototype.create_OcRam_Layers = function () {
        requestAnimationFrame(() => {
            _dynamicLayers.forEach(layer => {
                if (layer._battleLayer) layer.initLayer(this);
            }); this.showBattlePictures();
        });
    };

    Spriteset_Battle.prototype.showBattlePictures = function () {
        if (this._battlebackLocated) {
            _battlePics.forEach(pic => {
                $gameScreen.showPicture(pic[0], pic[1], pic[2], pic[3], pic[4], pic[5], pic[6], pic[7], pic[8]);
            });
        } else {
            requestAnimationFrame(() => { this.showBattlePictures() });
        }
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(Scene_Title, "createBackground", function () {

        _this.debug("_titleLayers:", _titleLayers);

        requestAnimationFrame(() => {
            _titleLayers.forEach(layer => {
                layer.initLayer(this);
            });
        });

        _this["Scene_Title_createBackground"].apply(this, arguments);

    });

    this.extend(Scene_Title, "update", function () {
        _this["Scene_Title_update"].apply(this, arguments);
        _titleLayers.forEach(layer => {
            layer.update();
        });
    });

    // Reset fixed to map layer position(s) based on display position...
    this.extend(Game_Map, "setDisplayPos", function (x, y) {
        _this["Game_Map_setDisplayPos"].apply(this, arguments);
        _parallaxLayers.forEach(layer => {
            layer._x = this._displayX * OcRam.twh[0];
            layer._y = this._displayY * OcRam.twh[1];
        });
        _dynamicLayers.forEach(layer => {
            if (layer._fixedToMap) {
                layer._x = this._displayX * OcRam.twh[0];
                layer._y = this._displayY * OcRam.twh[1];
            }
        });
    });

    // To scroll layers and sprites
    this.extend(Game_Map, "scrollLeft", function (distance) {
        const lastX = this._displayX; _this["Game_Map_scrollLeft"].apply(this, arguments);
        this.scrollX_OC(distance, lastX - this._displayX);
    });
    this.extend(Game_Map, "scrollRight", function (distance) {
        const lastX = this._displayX; _this["Game_Map_scrollRight"].apply(this, arguments);
        this.scrollX_OC(distance, lastX - this._displayX);
    });
    this.extend(Game_Map, "scrollDown", function (distance) {
        const lastY = this._displayY; _this["Game_Map_scrollDown"].apply(this, arguments);
        this.scrollY_OC(distance, lastY - this._displayY);
    });
    this.extend(Game_Map, "scrollUp", function (distance) {
        const lastY = this._displayY; _this["Game_Map_scrollUp"].apply(this, arguments);
        this.scrollY_OC(distance, lastY - this._displayY);
    });

    this.extend(Scene_Map, "start", function () {
        _this["Scene_Map_start"].apply(this, arguments);
        if (_gameSysLoading) {
            requestAnimationFrame(() => {
                $gameSystem.loadLayerData();
                _gameSysLoading = false;
            });
        }
    });

    // Make sure layers are saved before scene is terminated (except if new map)
    this.extend(Scene_Map, "terminate", function () {

        _parallaxLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
        });

        _dynamicLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
        });

        if ($gamePlayer.newMapId() > 0 && $gamePlayer.newMapId() != $gameMap.mapId()) {
            clearOnTransfer(); _parallaxLayers = [];
        }

        _this["Scene_Map_terminate"].apply(this, arguments);

    });

    this.extend(Scene_Battle, "terminate", function () {
        _dynamicLayers.forEach(layer => {
            if (layer._animate) clearInterval(layer._animate);
        }); _this["Scene_Battle_terminate"].apply(this, arguments);
    });

    this.extend(Scene_Title, "terminate", function () {
        _this["Scene_Title_terminate"].apply(this, arguments);
        _this.clearEveryThing();
    });

    // Update layers
    this.extend(Spriteset_Map, "update", function () {
        _this["Spriteset_Map_update"].apply(this, arguments);
        _parallaxLayers.forEach(layer => {
            layer.update();
        });
        _dynamicLayers.forEach(layer => {
            layer.update();
        });
    });

    this.extend(Spriteset_Battle, "update", function () {
        _this["Spriteset_Battle_update"].apply(this, arguments);
        _dynamicLayers.forEach(layer => {
            if (layer._battleLayer) layer.update();
        });
    });

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () {
        _this.clearAllLayers(); _dynamicLayers = [];
        _parallaxLayers = []; parseTitleLayersParam();
    };

    this.loadPluginData = gs => {
        _gameSysLoading = true;
    };

    this.savePluginData = gs => {
        gs.saveLayerData();
    };

    this.onMapStart = sm => { /* Private */ };
    this.onMapTerminate = sm => { };

    this.createLowerMapLayer = sm => {
        if (DataManager.isEventTest()) return;
        sm.create_OcRam_Layers();
        if (!_useOnlyParallaxMapping) {
            if ($dataTilesets[$dataMap.tilesetId].meta["parallax"] !== undefined) {
                useParallaxMapping();
            } else {
                useTileMapping();
            }
        }
    };

    this.createLowerBattleLayer = sb => {
        sb.create_OcRam_Layers();
    };

    this.onMapLoaded = sm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "setParallax", function (args) {
        _this.debug("Plugin command: setParallax", args);
        setParallax(Number(args.zIndex), String(args.imageName), Number(args.opacity), [Number(args.animFrames), Number(args.animRate)]);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setLayer", function (args) {
        const templates = _this.getTemplatesByName(String(args.templateName));
        _this.debug("Plugin command: setLayer", args, templates);
        templates.forEach(template => {
            setLayer(
                Number(template.zIndex), String(template.imageName), Number(template.opacity),
                OcRam.getBoolean(template.fixToMap), OcRam.getFloat(template.fader),
                OcRam.getBoolean(template.battleLayer), OcRam.getBoolean(template.clearOnTransfer),
                [Number(template.scrollX), Number(template.scrollY)],
                [Number(template.loopX), Number(template.loopY)],
                [Number(template.animFrames), Number(template.animRate)],
                [Number(template.offsetX), Number(template.offsetY)]
            );
        })
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setCustomLayer", function (args) {

        //z, img_name, opacity, fix_to_map, fade, battle_layer, clear_on_transfer, scroll, loop, offset, anim
        _this.debug("Plugin command: setCustomLayer", args);

        if (OcRam.isOmitted(args.zIndex)) args.zIndex = _defaultZindex;
        if (OcRam.isOmitted(args.opacity)) args.opacity = _defaultOpacity;
        if (OcRam.isOmitted(args.fixToMap)) args.fixToMap = _defaultFixedToMap;
        if (OcRam.isOmitted(args.fader)) args.fader = _defaultFadeTime;
        if (OcRam.isOmitted(args.battleLayer)) args.battleLayer = _defaultBattle;
        if (OcRam.isOmitted(args.clearOnTransfer)) args.clearOnTransfer = _defaultClearOnTransfer;
        if (OcRam.isOmitted(args.scrollX)) args.scrollX = _defaultScrollX;
        if (OcRam.isOmitted(args.scrollY)) args.scrollY = _defaultScrollY;
        if (OcRam.isOmitted(args.animFrames)) args.animFrames = 0;
        if (OcRam.isOmitted(args.animRate)) args.animRate = 0;
        if (OcRam.isOmitted(args.loopX)) args.loopX = _defaultLoopX;
        if (OcRam.isOmitted(args.loopY)) args.loopY = _defaultLoopY;
        if (OcRam.isOmitted(args.offsetX)) args.offsetX = 0;
        if (OcRam.isOmitted(args.offsetY)) args.offsetY = 0;

        setLayer(
            Number(args.zIndex), String(args.imageName), Number(args.opacity),
            OcRam.getBoolean(args.fixToMap), OcRam.getFloat(args.fader),
            OcRam.getBoolean(args.battleLayer), OcRam.getBoolean(args.clearOnTransfer),
            [Number(args.scrollX), Number(args.scrollY)],
            [Number(args.loopX), Number(args.loopY)],
            [Number(args.animFrames), Number(args.animRate)],
            [Number(args.offsetX), Number(args.offsetY)]
        );

    });

    PluginManager.registerCommand("OcRam_" + this.name, "clearLayer", function (args) {
        _this.debug("Plugin command: clearLayer", args);
        if (args.zIndex === null || args.zIndex === undefined) args.zIndex = -1;
        clearLayer(String(args.imageName), Number(args.zIndex), Number(args.fader));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "showPicture", function (args) {

        //pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode, fade
        _this.debug("Plugin command: picture", args);
        
        if (OcRam.isOmitted(args.opacity)) args.opacity = 255;
        if (OcRam.isOmitted(args.origin)) args.origin = 0;
        if (OcRam.isOmitted(args.x)) args.x = 0;
        if (OcRam.isOmitted(args.y)) args.y = 0;
        if (OcRam.isOmitted(args.scaleX)) args.scaleX = 100;
        if (OcRam.isOmitted(args.scaleY)) args.scaleY = 100;
        if (OcRam.isOmitted(args.blendMode)) args.blendMode = 0;
        if (OcRam.isOmitted(args.duration)) args.duration = 0;
        if (OcRam.isOmitted(args.easing)) args.easing = 0;

        $gameScreen.pictureFadeIn(
            Number(args.pictureId),
            String(args.pictureName),
            Number(args.origin),
            Number(args.x),
            Number(args.y),
            Number(args.scaleX),
            Number(args.scaleY),
            Number(args.opacity),
            Number(args.blendMode),
            Number(args.duration),
            Number(args.easing)
        );

    });

    PluginManager.registerCommand("OcRam_" + this.name, "erasePicture", function (args) {
        _this.debug("Plugin command: erasePicture", args);
        if (OcRam.isOmitted(args.duration)) args.duration = 0;
        $gameScreen.pictureFadeOut(Number(args.pictureId), Number(args.duration));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "tintPicture", function (args) {
        _this.debug("Plugin command: tintPicture", args);
        if (OcRam.isOmitted(args.red)) args.red = 0;
        if (OcRam.isOmitted(args.green)) args.green = 0;
        if (OcRam.isOmitted(args.blue)) args.blue = 0;
        if (OcRam.isOmitted(args.gray)) args.gray = 0;
        if (OcRam.isOmitted(args.duration)) args.duration = 0;
        $gameScreen.tintPicture(Number(args.pictureId), [
            Number(args.red),
            Number(args.green),
            Number(args.blue),
            Number(args.gray)
        ], Number(args.duration));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "rotatePicture", function (args) {
        _this.debug("Plugin command: rotatePicture", args);
        $gameScreen.rotatePicture(Number(args.pictureId), Number(args.speed));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "movePicture", function (args) {
        _this.debug("Plugin command: movePicture", args);
        $gameScreen.pictureFadeIn(Number(args.pictureId), Number(args.origin), Number(args.x), Number(args.y), Number(args.scaleX), Number(args.scaleY), Number(args.opacity), Number(args.blendMode), Number(args.duration), Number(args.easing));
    });

}.bind(OcRam.Layers)());