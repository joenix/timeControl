/* !!
 * Time Control With jQuery.Velocity
 * ===== ===== ===== ===== ===== =====
 * Code By Joenix: joenix@qq.com
 * ===== ===== ===== ===== ===== =====
 * Example:
 *
 * $.timeControl(
 *     {
 *         element: 'selector',
 *         key: 600,
 *         time: 1200,
 *         init: {
 *             width: 160,
 *             height: 240
 *         },
 *         effect: {
 *             color: '#f00',
 *             opacity: 0.36
 *         }
 *     },
 *     { ... }
 * );
 *
 * ===== ===== =====
 */

$.timeControl = function( configure )
{
	return (function( sword, tolerant, effect, meta, fps, stream, interval )
	{
		// Start Time
		stream = 0;

		// Interval For Close
		interval = setInterval(function()
		{
			// Clear No Conf
			if( !configure.length )
			{
				return clearInterval( interval );
			}

			// Time Increasing
			stream += fps;

			// Meta Factory
			meta( configure, stream, function( option )
			{
				// Effect Animation
				effect( tolerant( option ) );
			});

		}, fps );
	})
	(
		// Param: Sword - Recursion Function
		arguments.callee,

		// Action: Tolerant - Option Tolerant
		function( option )
		{
			// Merge Option
			return $.extend(
				// Configure Option
				option,
				// Time Duration
				{
					// Option Time
					time: {
						// Time Duration in Velocity
						duration: option.time || 0
					}
				}
			);
		},

		// Effect: key Core
		function( conf )
		{
			// No Element
			if( !conf.element )
			{
				return console.log('No Element !!');
			}

			// Selector Element
			conf.element = $( conf.element );

			// Init Css
			if( conf.init )
			{
				conf.element.css( conf.init );
			}

			// Run Velocity
			if( conf.effect )
			{
				conf.element.velocity( conf.effect, conf.time );
			}
		},

		// Meta: Factory
		function( configure, stream, callback )
		{
			// Key Valid
			if( configure.length && configure[0].key <= stream )
			{
				// Run Action
				callback( configure.shift() );

				// Run Recursive
				arguments.callee( configure, stream, callback );
			}

			return false;
		},

		// FPS
		60
	);

};
