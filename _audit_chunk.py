import re

with open('../hacien-website/.next/server/chunks/ssr/[root-of-the-server]__1y0m5_w._.js', 'r') as f:
    content = f.read()

# Check for transport implementations
checks = [
    'SMTPConnection',
    'SendmailTransport', 
    'StreamTransport',
    'JSONTransport',
    'SESTransport',
    'createTransport',
    'sendmail',
    'newline',
    'sendMail',
    'nodemailer.com',
    'pool',
    'createTestAccount',
    'getTestMessageUrl',
    'MailComposer',
    'DKIM',
    'shared',
    'well-known',
    'secureConnection',
    'connectionTimeout',
    'greetingTimeout',
    'socketTimeout',
]

for check in checks:
    if check in content:
        print(f'  {check}: FOUND')
    else:
        print(f'  {check}: NOT FOUND')

# Check the actual nodemailer module content
idx = content.find('nodemailer')
# Find the module boundaries around it
# Look for the module definition pattern
start = content.rfind('exports={', 0, idx)
end = content.find('exports={', idx+1)
if start < 0:
    start = 0
if end < 0:
    end = len(content)
    
# Find the actual module that contains 48531 (createTransport)
idx_48531 = content.find(',48531,')
if idx_48531 > 0:
    # Find the module boundaries
    mod_start = content.rfind('exports={', idx_48531 - 100000, idx_48531)
    mod_end = content.find('exports={', idx_48531 + 1)
    if mod_end < 0:
        mod_end = len(content)
    print(f'\n=== Module 48531 (createTransport) size: {mod_end - mod_start} bytes ===')
    # Find the createTransport function
    ct_idx = content.find('createTransport', mod_start, mod_end)
    if ct_idx > 0:
        print(f'createTransport at offset {ct_idx - mod_start} in module')
        print(content[ct_idx:ct_idx+500])
    print()

# Check total size and what % is nodemailer
print(f'\nTotal chunk size: {len(content):,} bytes')
print(f'nodemailer references: {content.count("nodemailer")}')