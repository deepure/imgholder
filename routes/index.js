var gm = require('gm')
module.exports = function (app) {
	app.get('/',function (req,res) {
		res.render('index',{
			title: 'imgholder'
		});
	});
    app.get('/:dimension/:fg_color?/:bg_color?', function (req, res, next) {
    	var size = req.params.dimension.split('x'),
	        width,height,fg,bg,
	        defaults = {
	            bg_color: 'ddd',
	            fg_color: '666'
	        }

        if(size.length === 1) {
            width = height = size[0] * 1;
        } else {
            width = size[0] * 1;
            height = size[1] * 1;
        }
        if (isNaN(width) || isNaN(height)) return next();
        if (typeof req.params.fg_color !== 'undefined') {
            fg = req.params.fg_color;
        } else {
            fg = defaults.fg_color;
        }
        if (fg[0] !== '#') fg = '#' + fg;

        if (typeof req.params.bg_color !== 'undefined') {
            bg = req.params.bg_color;
        } else {
            bg = defaults.bg_color;
        }
        if (bg[0] !== '#') bg = '#' + bg;
        format = 'png';
        font_size = Math.round(Math.min(width/5,height));
        tempZ = (width + '').length + (height + '').length;
        tw = tempZ * font_size;
        while (tw > width) {
            font_size -= 1;
            tw = tempZ * font_size;
        }
        text = (width + 'x' + height);
        gm(width, height, bg)
		    .gravity('Center')
		    .fill(fg)
		    .font("Impact")
		    .pointSize(font_size)
		    .drawText(0, 0, text)
		    .stream(format, function (err, stdout, stderr) {
		      if (err) return next(err)
		      res.set(
		        { 'Content-Type': 'image/' + format
		        , 'Cache-Control': 'max-age=315360000,public'
		        , 'Date': new Date().toUTCString()
		        , 'Last-Modified': new Date().toUTCString()
		        })
		      stdout.pipe(res)
		      stderr.pipe(process.stdout)
		    });
	});
	app.get('/:xxx',function (req,res) {
		res.render('index',{
			title: 'imgholder'
		});
	});
};