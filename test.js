importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.math);
importPackage(Packages.com.sk89q.worldedit.blocks);
importPackage(Packages.com.sk89q.worldedit.extent.clipboard.io);
importPackage(Packages.com.sk89q.worldedit.entity);
importPackage(Packages.com.sk89q.worldedit.session);
importPackage(Packages.com.sk89q.worldedit.function.operation);
importPackage(Packages.com.sk89q.worldedit.function.mask);
importPackage(Packages.com.sk89q.worldedit.regions.selector);
importPackage(Packages.com.sk89q.worldedit.world.block);
importPackage(Packages.com.sk89q.worldedit.math.transform);
importPackage(Packages.com.sk89q.worldedit.util);
importPackage(Packages.java.io);

//Clipboard clipboard;
//var clipboard = SchematicReader(filepath);
//ClipboardFormat format = ClipboardFormats.findByFile(file);
/*try (ClipboardReader reader = format.getReader(new FileInputStream(file))) {
	clipboard = reader.read();
}*/

//오류확인
context.checkArgs(1, 1, "<filename>");
var dir = player.getCardinalDirection();

if (!dir.isCardinal()) {
	context.error("You need to be facing North, East, South or West - i.e. in line with the blocks. Turn a little and try again.");
	context.exit();
}

//init
var playerblock = player.getBlockOn();
var x = playerblock.getBlockX();
var y = playerblock.getBlockY();
var z = playerblock.getBlockZ();

var sess = context.remember();

var filepath;
var file;

var clipboard;
var format;
var flinputstream;
var reader;
var holder;

var operation

//클립보드에 저장
/*
var localSession = context.getSession();
localSession.setClipboard(new ClipboardHolder(clipboard));
*/

//붙여넣기
function SolidorNot(string){
	filepath = "D:\\install\\MineCraft\\NewForgeFiles\\config\\worldedit\\schematics\\" + argv[1] + "_" + string + ".schem";
	file = new File(filepath);
	flinputstream = new FileInputStream(file);
	format = ClipboardFormats.findByFile(file);
	reader = format.getReader(flinputstream);
	clipboard = reader.read();
	holder = new ClipboardHolder(clipboard);

	var transform = new AffineTransform();
	if( dir==Direction.EAST ){
	    transform = transform.rotateY(-90);
		holder.setTransform(holder.getTransform().combine(transform));
	}
	else if( dir==Direction.SOUTH ){
	    transform = transform.rotateY(180);
		holder.setTransform(holder.getTransform().combine(transform));
	}
	else if( dir==Direction.WEST ){
	    transform = transform.rotateY(90);
		holder.setTransform(holder.getTransform().combine(transform));
	}


	operation = holder
				.createPaste(sess)
				.to(BlockVector3.at(x, y+1, z))
//				.maskSource(new BlockTypeMask(sess, BlockTypes.AIR))
//				.maskSource(new SolidBlockMask(sess))
				.build();

	Operations.complete(operation);
}

var fmasks = new MaskUnion(new BlockCategoryMask(sess, BlockCategories.get("minecraft:replaceable_plants"))
						, new BlockCategoryMask(sess, BlockCategories.UNDERWATER_BONEMEALS)
						, new BlockCategoryMask(sess, BlockCategories.IMPERMEABLE)
						, new BlockTypeMask(sess, BlockTypes.KELP_PLANT, BlockTypes.KELP, BlockTypes.TALL_SEAGRASS)
						, new BlockTypeMask(sess, BlockTypes.AIR, BlockTypes.CAVE_AIR, BlockTypes.WATER, BlockTypes.LAVA, BlockTypes.LIGHT)
						);

var smasks = new MaskUnion(new BlockCategoryMask(sess, BlockCategories.MINEABLE_AXE)
						 , new BlockCategoryMask(sess, BlockCategories.MINEABLE_HOE)
						 , new BlockCategoryMask(sess, BlockCategories.MINEABLE_PICKAXE)
						 , new BlockCategoryMask(sess, BlockCategories.MINEABLE_SHOVEL)

);


sess.setMask(fmasks);
SolidorNot("air");
sess.setMask(smasks);
SolidorNot("noair");
sess.setMask(null);

/*
sess.setMask(new BlockCategoryMask(sess, BlockCategories.get("minecraft:replaceable_plants")));
SolidorNot("air");
sess.setMask(new BlockCategoryMask(sess, BlockCategories.UNDERWATER_BONEMEALS));
SolidorNot("air");
sess.setMask(new BlockTypeMask(sess, BlockTypes.KELP_PLANT, BlockTypes.KELP));
SolidorNot("air");
sess.setMask(new SolidBlockMask(sess));
SolidorNot("noair");
sess.setMask(new BlockTypeMask(sess, BlockTypes.AIR, BlockTypes.CAVE_AIR, BlockTypes.WATER, BlockTypes.LAVA));
SolidorNot("air");
sess.setMask(null);
*/












/*
try {
	var reader = format.getReader(flinputstream);
	clipboard = reader.read();
	localSession.setClipboard(new ClipboardHolder(clipboard));
} catch (error) {
	
}*/

