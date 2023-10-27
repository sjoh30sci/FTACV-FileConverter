function MPTfile(file) {
    // Use FileReader API to read the file
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        var lines = contents.split('\n');

        // Check magic number
        var magic = lines[0];
        if (magic !== 'EC-Lab ASCII FILE' && magic !== 'BT-Lab ASCII FILE') {
            throw new Error("Bad first line for EC-Lab file: '" + magic + "'");
        }

        // Get number of headers
        var nbHeadersMatch = lines[1].match(/Nb header lines : (\d+)\s*$/);
        var nbHeaders = parseInt(nbHeadersMatch[1]);
        if (nbHeaders < 3) {
            throw new Error("Too few header lines: " + nbHeaders);
        }

        // Get comments and field names
        var comments = lines.slice(2, nbHeaders - 1);
        var fieldnames = lines[nbHeaders - 1].split('\t');

        // Parse data lines
        var dataLines = lines.slice(nbHeaders);
        var mptArray = dataLines.map(function(line) {
            var values = line.split('\t');
            // Convert values to numbers and replace commas with dots
            return values.map(function(value) {
                return parseFloat(value.replace(',', '.'));
            });
        });

        return {mptArray: mptArray, comments: comments};
    };
    reader.readAsText(file);
}

function fieldnameToDtype(fieldname) {
    // JavaScript doesn't have a direct equivalent of numpy's dtype,
    // but we can map the field names to JavaScript types for clarity.
    var typeMap = {
        'mode': 'Number',
        'ox/red': 'Boolean',
        'error': 'Boolean',
        'control changes': 'Boolean',
        'Ns changes': 'Boolean',
        'counter inc.': 'Boolean',
        'time/s': 'Number',
        'P/W': 'Number',
        '(Q-Qo)/mA.h': 'Number',
        'x': 'Number',
        'control/V': 'Number',
        'control/mA': 'Number',
        'control/V/mA': 'Number',
        '(Q-Qo)/C': 'Number',
        'dQ/C': 'Number',
        'freq/Hz': 'Number',
        '|Ewe|/V': 'Number',
        '|I|/A': 'Number',
        'Phase(Z)/deg': 'Number',
        '|Z|/Ohm': 'Number',
        'Re(Z)/Ohm': 'Number',
        '-Im(Z)/Ohm': 'Number'
    };

    return typeMap[fieldname] || null;
}

function commaConverter(floatText) {
    // Replace commas with dots and convert to number
    return parseFloat(floatText.replace(',', '.'));
}

function MPTfileCSV(file) {
    // Use FileReader API to read the file
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        var lines = contents.split('\n');

        // Check magic number
        var magic = lines[0].trim();
        if (magic !== 'EC-Lab ASCII FILE') {
            throw new Error("Bad first line for EC-Lab file: '" + magic + "'");
        }

        // Get number of headers
        var nbHeadersMatch = lines[1].match(/Nb header lines : (\d+)\s*$/);
        var nbHeaders = parseInt(nbHeadersMatch[1]);
        if (nbHeaders < 3) {
            throw new Error("Too few header lines: " + nbHeaders);
        }

        // Get comments
        var comments = lines.slice(2, nbHeaders - 1);

        // Parse CSV data using Papa Parse
        var csvData = Papa.parse(lines.slice(nbHeaders).join('\n'), {header: true});

        // Check field names
        var expectedFieldnames = [
            ["mode", "ox/red", "error", "control changes", "Ns changes",
             "counter inc.", "time/s", "control/V/mA", "Ewe/V", "dq/mA.h",
             "P/W", "<I>/mA", "(Q-Qo)/mA.h", "x"],
            ['mode', 'ox/red', 'error', 'control changes', 'Ns changes',
             'counter inc.', 'time/s', 'control/V', 'Ewe/V', 'dq/mA.h',
             '<I>/mA', '(Q-Qo)/mA.h', 'x'],
            ["mode", "ox/red", "error", "control changes", "Ns changes",
             "counter inc.", "time/s", "control/V", "Ewe/V", "I/mA",
             "dQ/mA.h", "P/W"],
            ["mode", "ox/red", "error", "control changes", "Ns changes",
             "counter inc.", "time/s", "control/V", "Ewe/V", "<I>/mA",
             "dQ/mA.h", "P/W"]
        ];
        if (!expectedFieldnames.includes(csvData.meta.fields)) {
            throw new Error("Unrecognised headers for MPT file format");
        }

        return {csvData: csvData.data, comments: comments};
    };
    reader.readAsText(file);
}
