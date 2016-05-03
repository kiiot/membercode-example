# membercode-example

# Configuration

1. Edit `config/default.json`.
2. Update MySQL Database information.
3. Update Validator

# Validator for Url Verification

1. IIOT Server will `GET` the registered url, the url should return validator string for verification.

Example:

```bash
# IIOT Server will GET the registered url with the validator displayed in IIOT Admin Portal - "ABCDEFG".
http GET https://127.0.0.1:9527/code

# The url should return the text "ABCDEFG"
ABCDEFG

```
2. IIOT Server will POST the barcode message request with the registered secret. The partner system should return the code message in JSON type.

Example:

```bash
http POST https://127.0.0.1:9527/code phone='+886933332334' secret='secret1234'

# the partner code system should return the members' code. If the member is unknown, the system should generate a new one and return.
{
  "code":"H12345678",
  "phone":"+886933332334"
}

```
