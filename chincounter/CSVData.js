// CSVData.js
//
// Copyright (c) 2008, Codess
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Codess nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

var CSVData = {};

// CSV column delimiter char
CSVData.colDelimiter = ',';

/**
 * CSV data parser
 * @param {String} data CSV textdata
 * @return {Array} 2d
 */
CSVData.parse = function(data)
{
    var rows = new Array();
    var cols = new Array();
    var quated = false;
    var colStartIndex = 0;
    var quateCount = 0;
    
    for (i=0; i<data.length; i++) {
        var c = data.charAt(i);
        
        if (c == '"') {
            quateCount++;
            
            if (!quated) {
                quated = true;
            }
            else {
                if (quateCount % 2 == 0 ) {
                    if (i == data.length - 1 || data.charAt(i + 1) != '"') {
                        quated = false;
                    }
                }
            }
        }
        
        if (!quated) {
            if (c == CSVData.colDelimiter) {
                var value = data.substring(colStartIndex, i);
                value = CSVData.unescape(value);
                cols.push(value);
                colStartIndex = i + 1;
            }
            else if (c == "\r") {
                var value = data.substring(colStartIndex, i);
                value = CSVData.unescape(value);
                cols.push(value);
                i += 1;
                colStartIndex = i + 1;
                rows.push(cols);
                cols = new Array();
            }
            else if (c == "\n") {
                var value = data.substring(colStartIndex, i);
                value = CSVData.unescape(value);
                cols.push(value);
                colStartIndex = i + 1;
                rows.push(cols);
                cols = new Array();
            }
        }
    }
    
    return rows;
};

/**
 * CSV column escape
 * @param {String} value Column value
 * @return {String} Escaped value
 */
CSVData.escape = function(value)
{
    value = value.replace(/"/g, '""');
    value = '"' + value + '"';
    return value;
};

/**
 * CSV column unescape
 * @param {String} value Column value
 * @return {String} Unescaped value
 */
CSVData.unescape = function(value)
{
    if (value.charAt(0) == '"' && 
        value.charAt(value.length-1) == '"') {
        value = value.substring(1, value.length-1);
    }
    value = value.replace(/""/g, '"');
    return value;
};
