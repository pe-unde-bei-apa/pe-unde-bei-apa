const fs = require('node:fs');

var n1 = parseInt("5f8", 16);
var n2 = parseInt("3bb4", 16);

function nbc(e) {
            const t = e.replace(/<br>|<\/br>|<p>|<\/p>/g, "");
            var n = t.length;
            n >= 755 && (n = 755);
            let i = 0;
            for (let e = 0; e < n; e += 1) {
                const n = t.codePointAt(e),
                    s = n.toString().length;
                i = i + n + s
            }
            const s = i + t.length + n1,
                r = String(s * s + n2);
            return (r.slice(-1) + r.slice(1, -1) + r[0]).split("").reverse().join("")
        }

var filename_in = process.argv[2];
console.error("READING ", filename_in);

const data = fs.readFileSync(filename_in, 'utf8');
var value = nbc(data);
console.error("VALUE IS ", value)
console.log(value);