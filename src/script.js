document.addEventListener('DOMContentLoaded', function () {

    // Elements
    const thePwd = document.getElementById('thePwd')
    const genLabel = document.getElementById('genLabel')
    const genPwd = document.getElementById('genPwd')
    const toggleButton = document.getElementById('toggleButton')
    const copyButton = document.getElementById('copyButton')

    // Apply SHA256 to a given string
    function sha256(message) {
        return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex)
    }

    // When thePwd textbox content changes, re-calculate genPwd
    thePwd.addEventListener('input', function () {
        genPwd.value = calculateGenPwd(thePwd.value, genLabel.value)
    })

    // When genLabel textbox content changes, re-calculate genPwd
    genLabel.addEventListener('input', function () {
        // Whitespaces are not allowed
        if (/\s/.test(genLabel.value)) {
            genLabel.classList.add('error')
        } else {
            genLabel.classList.remove('error')
        }

        genPwd.value = calculateGenPwd(thePwd.value, genLabel.value)
    })

    // When show/hide button clicked
    toggleButton.addEventListener('click', function () {
        if (genPwd.type === 'password') {
            genPwd.type = 'text'
            toggleButton.textContent = 'Hide'
            toggleButton.classList.remove('show')
            toggleButton.classList.add('hide')
        } else {
            genPwd.type = 'password'
            toggleButton.textContent = 'Show'
            toggleButton.classList.remove('hide')
            toggleButton.classList.add('show')
        }
    })

    // When copy button clicked
    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(genPwd.value)
    })

    // Calculate genPwd given thePwd, genLabel
    function calculateGenPwd(thePwd, genLabel) {
        // Hash, then pick the first 16 characters
        var hashed = sha256(thePwd + genLabel)
        var hashed16 = hashed.slice(0, 16)
        var genPwd = hashed16
    
        // Turn first letter to uppercase, no action if all digits
        for (var i = 0; i < hashed16.length; i++) {
            if (hashed16[i] >= 'a' && hashed16[i] <= 'z') {
                genPwd = hashed16.slice(0, i) + hashed16[i].toUpperCase() + hashed16.slice(i + 1)
                break
            }
        }

        return genPwd
    }

    // Execute once when loading to initiate genPwd textbox
    genPwd.value = calculateGenPwd(thePwd.value, genLabel.value)
})
