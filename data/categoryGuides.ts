/**
 * Buyer-facing category guides. Industry explanations only, plus services
 * HACIEN already describes (quotation, sourcing per order, delivery coverage,
 * and procurement papers). No prices, stock, lead times, client names, or
 * brand-authorization claims.
 */

export type GuidePoint = {
  title: string;
  text: string;
};

export type SpecRow = {
  topic: string;
  guidance: string;
};

export type CategoryGuide = {
  slug: string;
  whatItIs: string[];
  useCases: GuidePoint[];
  specs: SpecRow[];
  beyond: GuidePoint[];
  rfqChecklist: string[];
};

const papers =
  "For a government request, HACIEN can align the quotation with the purchase request: itemized descriptions, quantities, and a signed conforme for the lines the quotation actually covers. Registration papers are sent on private request for accreditation. They are not published on this website.";

function beyond(sourcing: string, configuration: string, installation: string): GuidePoint[] {
  return [
    { title: "Sourcing", text: sourcing },
    { title: "Configuration", text: configuration },
    {
      title: "Delivery",
      text: "Delivery covers the Philippines. Metro Manila and nearby provinces can be dispatched directly. Luzon, Visayas, and Mindanao move by insured land, air, or sea cargo. The delivery fee is quoted on the order.",
    },
    { title: "Installation", text: installation },
    {
      title: "Warranty handling",
      text: "Warranty follows the manufacturer or distributor terms for the exact model. Those terms are written in the quotation. HACIEN coordinates the warranty paperwork with the delivery records. This page does not set a warranty length.",
    },
    { title: "Procurement documents", text: papers },
  ];
}

const sharedRfq = [
  "Office or agency name, the site, and a contact who can clarify the requirement.",
  "Quantity and whether an approved equivalent is acceptable.",
  "Preferred brands, if you have them. Leave the brand open if you want options.",
  "Delivery address, receiving hours, and whether installation is included.",
  "Any document the quotation must match, such as technical specifications or a conforme.",
];

export const categoryGuides: CategoryGuide[] = [
  {
    slug: "computers-laptops",
    whatItIs: [
      "Computers and laptops are the endpoints people use every day: desktops at a fixed desk, notebooks for staff who move, and workstations when the job needs a stronger processor or a discrete graphics card. In Philippine offices the same request often mixes all three, plus monitors, keyboards, and a small UPS for the desk.",
      "A useful request names the work, not only a model code. Clerical seats, faculty laptops, finance desks with two screens, and design or engineering seats do not share one specification. HACIEN turns that mix into one quotation. The exact brand and model are confirmed when the distributor confirms availability. Nothing on this page is a price or a promise of stock.",
    ],
    useCases: [
      {
        title: "Agency and LGU offices",
        text: "Admin, treasury, and records staff usually need a business desktop or a 14-inch to 16-inch laptop, a Full HD monitor, and a wired network port or a dock. Domain join and disk encryption, when the office uses them, need a Pro-class operating system rather than a home edition.",
      },
      {
        title: "Schools and training labs",
        text: "A computer laboratory is a count of identical seats, a teacher station, and a network that can take the whole class online at once. Faculty who carry work between buildings usually need a laptop with a full-shift battery, not a desktop.",
      },
      {
        title: "Private offices and shared service floors",
        text: "A standard image across a floor is easier to support than a mix of one-off models. Finance and operations desks often add a second monitor. Field staff add a lighter notebook and a sleeve, not a tower.",
      },
      {
        title: "Design, drafting, and technical seats",
        text: "CAD, video, GIS, and large spreadsheets need more memory, a larger SSD, and sometimes a discrete GPU. Say the application. A general office laptop will not be sized for that work.",
      },
    ],
    specs: [
      {
        topic: "Processor class",
        guidance:
          "Everyday office work is usually comfortable on a current Core i5 or Ryzen 5 class chip. Heavier multitasking, light design, and some engineering tools move to Core i7 or Ryzen 7 class. Name the application if you are unsure.",
      },
      {
        topic: "Memory",
        guidance:
          "8 GB is tight once several browser tabs and an office suite are open. 16 GB is the practical baseline for office and teaching seats. 32 GB is the usual step up for design, data, and machines that stay on all day with many files open.",
      },
      {
        topic: "Storage",
        guidance:
          "Ask for an SSD, not a hard drive, on any new endpoint. 512 GB is a sensible office baseline. 256 GB fills quickly with local files. 1 TB is worth naming when users keep video, drawings, or archives on the device.",
      },
      {
        topic: "Display and form",
        guidance:
          "A 23.8-inch or 24-inch Full HD monitor suits most desks. Dual monitors help finance and operations. Laptops are specified by screen size and weight. Small-form-factor desktops save space. A tower is for seats that need a full-size graphics card.",
      },
      {
        topic: "Ports and management",
        guidance:
          "Note HDMI or DisplayPort, USB-C docking, a wired LAN port, and a webcam if meetings are daily. If the IT office images machines or joins them to a domain, say so. Those details change the operating-system edition and the accessories.",
      },
    ],
    beyond: beyond(
      "HACIEN sources desktops, laptops, and workstations per order from Philippine distributors. Buyers often name Dell, HP, Lenovo, Asus, Acer, or Apple. The quotation uses the brand you specify, or an equivalent you approve in writing.",
      "When you ask for it, the quotation can include memory and storage at the tier above, a monitor, a dock, and a keyboard and mouse set so the seat arrives ready to deploy.",
      "Unboxing and placement at the desk can be included when the request says installation. Imaging and joining a domain stay with your IT office unless you ask HACIEN to coordinate that work and it is written into the quotation.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Seat type: clerical, faculty, finance, design, or field.",
      "Processor class, RAM, SSD size, screen size, and desktop or laptop.",
      "Monitor count, dock, and operating-system edition if you already know them.",
      "Whether a desk UPS should be quoted with the computer. See Power & UPS for sizing.",
    ],
  },
  {
    slug: "servers-storage",
    whatItIs: [
      "Servers and storage hold the files, applications, and backups an office cannot keep only on laptops. A small office often starts with a NAS appliance. A branch that runs a local system, a database, or several virtual machines needs a tower or rack server with redundant disks and, where the platform allows it, ECC memory.",
      "Sizing follows the workload. File sharing for fifty people is not the same purchase as a virtualization host or a backup target that must keep months of restore points. HACIEN quotes the class of machine, the disk layout, and the warranty option after you describe users, applications, and retention. Exact model and availability are confirmed in the quotation.",
    ],
    useCases: [
      {
        title: "Shared files for an office or campus",
        text: "Departments that still pass files by USB or personal drives usually need a NAS with user permissions and a second copy on another disk or another device. Name the number of users and the rough size of the file share.",
      },
      {
        title: "A first local server",
        text: "Accounting systems, a local application, or a small virtualization host need a server with a documented processor class, memory, and a RAID set. Say whether it will live in a rack, a closet, or under a counter. Power and cooling belong in the same request.",
      },
      {
        title: "Backup that is not the same box as the files",
        text: "A backup target should survive the loss of the primary server. Tell HACIEN how many days or months you must restore, and whether the copy stays on site, goes to another building, or both.",
      },
      {
        title: "School and agency records",
        text: "Registrars, HR, and records units often need a locked-down share and a retention rule, not the largest chassis in a brochure. The quotation can separate the live share from the backup disks.",
      },
    ],
    specs: [
      {
        topic: "Form factor",
        guidance:
          "A tower server or a NAS suits a small room without a rack. A 1U or 2U rack server suits a cabinet with metered power. Say how many rack units are free, and whether the room has cooling beyond an ordinary office air-conditioner.",
      },
      {
        topic: "Processor and memory",
        guidance:
          "File and light application loads often stay on a single processor. Virtualization and databases may need more cores and 32 GB, 64 GB, or 128 GB of memory. ECC memory is the usual server choice when the platform supports it, because it detects memory errors that a desktop DIMM ignores.",
      },
      {
        topic: "RAID and disks",
        guidance:
          "RAID 1 mirrors two disks. RAID 5 and RAID 6 spread data across more disks so one, or with RAID 6 two, can fail without losing the volume. RAID 10 mirrors striped pairs and is common for databases. Usable capacity is smaller than the sum of the raw disks. The quotation should state both.",
      },
      {
        topic: "NAS versus server",
        guidance:
          "A NAS is an appliance for files, snapshots, and backup. A server runs the operating system and applications you choose. Some offices need both: the server for the application, the NAS as the backup target.",
      },
      {
        topic: "Network and power",
        guidance:
          "Ask for dual network ports when the server must stay reachable if one switch link fails. A UPS for the server is a separate line. See Power & UPS. A desktop-sized UPS is rarely enough for a rack server and its disks.",
      },
    ],
    beyond: beyond(
      "HACIEN sources tower servers, rack servers, and NAS appliances per order. Buyers often name Dell or Lenovo for servers. The quotation states the exact chassis after the distributor confirms it, or an equivalent you approve.",
      "Disk groups, memory, rail kits, and a backup license can be lines on the same quotation so the machine is not ordered as an empty chassis.",
      "Rack, stack, and basic power-on can be included when installation is in the request. Application install, directory design, and data migration stay in scope only when the quotation lists them.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Workload: file share, application, database, virtualization, or backup target.",
      "User count, approximate data size, and how long backups must be kept.",
      "Tower, rack, or NAS, and the rack units and power available on site.",
      "Whether a UPS, switch ports, and a backup copy at a second site are in scope.",
    ],
  },
  {
    slug: "network-equipment",
    whatItIs: [
      "Network equipment is how rooms, floors, and buildings reach each other and the internet: switches, wireless access points, routers, firewalls, and the cabling that ties them together. A small office can run on one managed switch and a few access points. A school, hospital wing, or multi-floor office needs a plan for uplinks, VLANs, and power over Ethernet.",
      "Wi-Fi that looks fine for ten people fails when a classroom or a hearing room comes online together. HACIEN quotes switching, wireless, firewall, and cabling from the site facts you send: floor area, wall types, user counts, and what must stay on its own network. A site survey is part of project work when the request includes installation. See the project steps under Solutions.",
    ],
    useCases: [
      {
        title: "A new or renovated office floor",
        text: "Workstations, printers, and access points need switch ports, and many of those devices need Power over Ethernet. The quotation should separate access switches, the uplink to the router or firewall, and the patch cords.",
      },
      {
        title: "Campus and school Wi-Fi",
        text: "Classrooms, libraries, and gyms are dense. Count people per room, not only rooms per building. Wi-Fi 6 is the current baseline for new indoor deployments. Wi-Fi 6E and Wi-Fi 7 add spectrum. They help only when the laptops and phones can use it.",
      },
      {
        title: "Branch offices and LGU sites",
        text: "A branch often needs a firewall with VPN back to the main office, a small switch, and one or two access points. Name the internet bandwidth and how many people use the VPN at once.",
      },
      {
        title: "Cameras and phones on the same closet",
        text: "IP cameras and wireless access points draw power from the switch. Add their wattage before you pick a PoE budget. A switch that is short on power drops cameras at night.",
      },
    ],
    specs: [
      {
        topic: "Managed and unmanaged switches",
        guidance:
          "An unmanaged switch only forwards frames. A managed switch adds VLANs, link aggregation, basic quality of service, and a way to see which port is down. Offices, schools, and any site with guest Wi-Fi or cameras should ask for managed switches.",
      },
      {
        topic: "Power over Ethernet",
        guidance:
          "802.3af supplies about 15.4 W at the port, enough for many phones and simple cameras. 802.3at (PoE+) supplies about 30 W for access points and many dome cameras. 802.3bt supplies roughly 60 W to 90 W for PTZ cameras and some high-power devices. The switch budget is the total watts, not the per-port figure times every port.",
      },
      {
        topic: "Wi-Fi standard",
        guidance:
          "Wi-Fi 5 (802.11ac) is still common in older sites. Wi-Fi 6 (802.11ax) handles more devices on one access point and is the usual target for a new office or classroom. Wi-Fi 6E uses the 6 GHz band. Wi-Fi 7 (802.11be) is newer still. Match the standard to the devices people actually carry.",
      },
      {
        topic: "Cabling",
        guidance:
          "Cat6 is the usual horizontal cable for gigabit to the desk. Cat6A is the step up when you want 10-gigabit runs or a hotter bundle in a tray. Fiber is for uplinks between closets and buildings. Name existing cable if you are only replacing switches.",
      },
      {
        topic: "Firewall",
        guidance:
          "A firewall is sized by internet bandwidth, VPN users, and the security features you turn on. Threat-filter subscriptions slow a box that was sized only for raw throughput. Buyers often name Cisco. The quotation confirms the model and any subscription term. It does not assume a license you did not ask for.",
      },
    ],
    beyond: beyond(
      "HACIEN sources switches, access points, and firewalls per order. Buyers often name Cisco, Ubiquiti, TP-Link, or MikroTik. The brand in the quotation is the one you specify, or an equivalent you accept.",
      "VLAN plan, PoE budget, and uplink speed can be written into the bill of quantities so the closet is not a pile of unmatched boxes.",
      "When installation is in scope, HACIEN can survey the rooms, pull or reuse cable, mount access points, label ports, and test the links that the quotation lists. Live cutover of an existing network is scheduled in the quotation, not assumed.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Floor count, rough area, and where the equipment closet is.",
      "Users per area, and whether guest Wi-Fi must stay off the office network.",
      "Switch port count, PoE devices (access points, cameras, phones), and uplink speed.",
      "Internet bandwidth, VPN users, and whether new cabling is required.",
    ],
  },
  {
    slug: "printers-peripherals",
    whatItIs: [
      "Printers and peripherals are the shared devices around the computers: multifunction printers, scanners, monitors, and the small hardware that finishes a desk. A department printer is chosen from monthly page volume, color or black-and-white, and whether people scan to a folder or only copy at the glass.",
      "Ink tank and laser are different tools. Ink tank suits lower volumes and color pages. Laser suits higher monthly volumes and plain text. HACIEN quotes the device and asks you to name volume so the consumable plan matches the machine. Page prices are not published here. They are confirmed in the quotation, together with the yield the manufacturer states for that cartridge or bottle.",
    ],
    useCases: [
      {
        title: "Admin and records counters",
        text: "A shared multifunction printer with duplex and a network port covers letters, forms, and scanning to email or a folder. Say A4 or A3. Most Philippine office forms are A4. Drawings and maps are not.",
      },
      {
        title: "Schools",
        text: "A faculty room often needs a sturdy black-and-white laser and a separate color device for modules. Laboratories may need a scanner with a sheet feeder, not only a flatbed.",
      },
      {
        title: "Service desks that already have computers",
        text: "A monitor, keyboard, and mouse bundle is a peripherals request even when the CPU was bought earlier. Name the screen size and whether the PC has HDMI or DisplayPort.",
      },
      {
        title: "High monthly volume",
        text: "If the office prints thousands of pages a month, say the number. A small ink tank sold for a home will not be the right class, and the quotation should include spare consumables.",
      },
    ],
    specs: [
      {
        topic: "Print technology",
        guidance:
          "Laser printers fuse toner and suit shared black-and-white volume. Ink tank printers use bottles and suit color at modest volume. Cartridge inkjets cost less to buy and more to run. The quotation can show the manufacturer's rated yield. It is not a promise of your actual cost per page.",
      },
      {
        topic: "Monthly volume",
        guidance:
          "Manufacturers publish a recommended monthly volume and a higher maximum duty cycle. Buy for the recommended figure. A machine run at its maximum every month wears out early.",
      },
      {
        topic: "Functions and paper",
        guidance:
          "Print, scan, copy, and fax are separate features. Auto duplex and a 50-sheet feeder matter for records. A3 is a different chassis from A4. Network models should have Ethernet. Wi-Fi is convenient and a poor fit for a locked records room.",
      },
      {
        topic: "Monitors and deskside gear",
        guidance:
          "Full HD at 23.8 or 24 inches is the office default. 27-inch and higher resolutions are for people who live in spreadsheets or drawings. Confirm the video output on the computer before you add an adapter.",
      },
    ],
    beyond: beyond(
      "HACIEN sources printers, scanners, and monitors per order. Buyers often name Epson, Brother, or Canon for multifunction printers. The quotation names the exact model after the distributor confirms it.",
      "The first set of toner, ink, or a spare drum can be a line on the quotation so the device is usable on delivery day.",
      "Placement, network setup, and a short test print can be included when you ask for installation. Driver rollout to every PC is included only when the quotation says so.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Monthly page count, color or black-and-white, and A4 or A3.",
      "Print only, or scan and copy as well, and whether a sheet feeder is required.",
      "Network, USB, or Wi-Fi, and where the device will sit.",
      "Monitor size and quantity if peripherals are part of the same request.",
    ],
  },
  {
    slug: "licensed-software",
    whatItIs: [
      "Licensed software is the operating system, the productivity suite, endpoint protection, and the business applications an organization is allowed to run. The license is the product. A disc or a download link without the right agreement does not satisfy an audit or a government inspection of installed software.",
      "HACIEN quotes licenses against a user or device count and the term you need. Channel rules differ by product and by whether the buyer is a private company, a school, or a government office. The quotation states the license type the distributor can actually supply. It does not assume a program HACIEN has not confirmed for that order.",
    ],
    useCases: [
      {
        title: "A new batch of computers",
        text: "Each PC needs an operating-system license that matches the edition you will use. Pro features such as domain join and BitLocker are not in every home edition. Name the edition in the same request as the hardware.",
      },
      {
        title: "Productivity for an office or a faculty",
        text: "Word processing, spreadsheets, and email are usually bought per person, as a subscription or as a perpetual license when the vendor still sells one. Count people, not only PCs, when the license is per user.",
      },
      {
        title: "Endpoint protection",
        text: "Antivirus and detection tools are sold per device or per user, often for one year or three. Send the current expiry date if this is a renewal, and say whether you need a cloud console.",
      },
      {
        title: "A school laboratory",
        text: "Education pricing, when a vendor offers it, depends on proof of the school and on a minimum count. Send the laboratory size. HACIEN confirms whether that program is available for the order. It is not automatic.",
      },
    ],
    specs: [
      {
        topic: "License type",
        guidance:
          "A subscription is paid per term and usually includes upgrades. A perpetual license is a version you keep, with upgrades sold separately. OEM licenses are tied to the computer they were bought with. Volume agreements cover many seats under one contract. The right type depends on the product and the buyer.",
      },
      {
        topic: "Count",
        guidance:
          "Per-user licenses follow people, including those with two devices. Per-device licenses follow computers. Mixing the two in one request without labels produces the wrong quantity. List them separately.",
      },
      {
        topic: "Term and renewal",
        guidance:
          "Annual terms are the common default. Multi-year terms exist for some products. Send the renewal date if the old license is still running, so the new term does not start with a gap or a long overlap.",
      },
      {
        topic: "Administration",
        guidance:
          "Say who will own the admin console. A license that arrives with no admin account is hard to assign. HACIEN can include the handover of admin access in the quotation when you ask for it.",
      },
    ],
    beyond: beyond(
      "HACIEN sources business software per order through the distributor channel that can sell it to your type of organization. Buyers often name Microsoft for productivity and operating systems. The quotation names the exact SKU.",
      "User counts, edition, and term are checked against the program rules before the quotation is sent. HACIEN does not guess a discount or a school program that has not been confirmed.",
      "Software has no site installation in the cabling sense. Assignment of licenses and a short admin handover can be part of the quotation. Building the tenant, migrating mail, and training are separate lines if you want them.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Product name, edition, and per-user or per-device.",
      "Quantity, and the renewal date if this replaces a current license.",
      "Subscription or perpetual, and one year or longer if you have a preference.",
      "Whether admin handover should be included.",
    ],
  },
  {
    slug: "security-surveillance",
    whatItIs: [
      "Security and surveillance here means the physical systems on a site: cameras, a recorder, disks for retention, and access control on doors. It is separate from cybersecurity, which is firewalls and endpoint protection, though a camera network still needs a switch and sometimes its own VLAN.",
      "A small shop or office might start with four to eight cameras and one recorder. A school campus, a warehouse, or a city facility needs a channel count, a retention period, and a decision between IP cameras and older analog cameras. HACIEN quotes the package from the coverage you describe. Camera placement on a plan beats a round number with no drawing.",
    ],
    useCases: [
      {
        title: "Office lobby, stock room, and gate",
        text: "Entrances, the cashier or counter, the stock room, and the vehicle gate are the usual first cameras. Outdoor cameras need a housing rated for rain. Say day and night, and whether you need to read a plate or only see that a vehicle entered.",
      },
      {
        title: "Schools",
        text: "Gates, corridors, and covered walks are the common ask. Classrooms and toilets are not a default. If a school wants coverage near those areas, the buyer should confirm its own privacy rules before the cameras are ordered.",
      },
      {
        title: "Warehouses and compounds",
        text: "Long aisles and perimeters need different lenses from a lobby dome. A 16-channel or 32-channel recorder is a starting point only after the camera count is known. Leave spare channels if you expect to add cameras within the year.",
      },
      {
        title: "Doors and access control",
        text: "A card reader, a biometric reader, a lock, and a door controller are a different bill of materials from cameras. Count doors, not buildings, and say whether the door must stay locked when power fails.",
      },
    ],
    specs: [
      {
        topic: "Resolution",
        guidance:
          "2 megapixels is about 1080p and is enough to see activity in a lobby. 4 megapixels gives more detail for entrances. 8 megapixels (about 4K) is for scenes where you must zoom into a recorded face or a counter. Higher resolution uses more disk for the same number of days.",
      },
      {
        topic: "IP and analog",
        guidance:
          "IP cameras use the network and a network video recorder (NVR). Analog and HD-over-coax cameras use a digital video recorder (DVR) and coaxial cable. New cabling jobs are usually IP. An existing coaxial plant can stay on a DVR if replacing the cable is out of scope.",
      },
      {
        topic: "Recorder channels and disks",
        guidance:
          "NVR and DVR channel counts commonly step through 4, 8, 16, and 32. Retention in days depends on resolution, frames per second, and how often the scene moves. The quotation should state the assumed days and the disk size that supports them. It is an estimate from those assumptions, not a guarantee of image quality.",
      },
      {
        topic: "Power and network",
        guidance:
          "IP cameras are usually powered by PoE from a switch or from an NVR with PoE ports. Add the camera watts to the switch budget. See Network Equipment. A UPS on the recorder and the switch keeps recording through a short outage.",
      },
      {
        topic: "Access control",
        guidance:
          "Decide card, fingerprint, or both, and whether the event log must sit on a PC on site. Fail-secure locks stay locked without power. Fail-safe locks open. Fire exits must follow the building rule the buyer is already under. HACIEN does not replace the building official.",
      },
    ],
    beyond: beyond(
      "HACIEN sources cameras, recorders, and access-control hardware per order. Buyers often name Hikvision, Dahua, or Ubiquiti for cameras. The quotation uses the brand you name, or an equivalent you approve.",
      "Channel count, disk size, PoE, and outdoor housings are listed as separate lines so a missing mount is not discovered on installation day.",
      "When installation is included, HACIEN can mount the cameras the quotation lists, terminate the cable, set retention, and hand over a labeled plan. Civil works, core drilling, and permits stay out of scope unless the quotation adds them.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Camera count, indoor or outdoor, and what each view must show.",
      "IP or analog, and whether cable is already in place.",
      "Days of retention, and whether night detail or plate detail matters.",
      "Door count for access control, and card, biometric, or both.",
    ],
  },
  {
    slug: "accessories-consumables",
    whatItIs: [
      "Accessories and consumables are the small lines that make a larger purchase usable: patch cords, display cables, adapters, labels, cable ties, storage media, and printer supplies. They are rarely the reason for a project, and they are often the reason a project stalls on delivery day.",
      "HACIEN quotes them with the computers, network, or printers they support, or as their own lot when you are restocking. Brand and length should be explicit. A two-meter patch cord does not reach across a meeting table, and a USB-C laptop does not drive an HDMI monitor without the right cable or dock.",
    ],
    useCases: [
      {
        title: "A PC rollout",
        text: "Each seat needs a power cord that matches the local outlet, a display cable, and often a spare mouse. Order the accessories with the computers so the count matches the seats.",
      },
      {
        title: "A network closet",
        text: "Patch cords in two or three lengths, Velcro ties, and labels turn a new switch into a closet someone else can maintain. Say the port count.",
      },
      {
        title: "Printers already on site",
        text: "Toner, ink bottles, and drums are consumables tied to a model. Send the model number. A look-alike cartridge is not assumed to be acceptable.",
      },
      {
        title: "Training rooms and labs",
        text: "Headsets, extra keyboards, and flash drives or external SSDs are common add-ons. Name the quantity per room.",
      },
    ],
    specs: [
      {
        topic: "Copper patch cords",
        guidance:
          "Cat6 patch cords are the usual match for Cat6 horizontal cable. Order factory-terminated cords for the closet. Typical lengths are 0.5 m, 1 m, 2 m, and 3 m. Longer cords belong at the desk, not in the patch panel.",
      },
      {
        topic: "Video and USB",
        guidance:
          "HDMI, DisplayPort, and USB-C are not interchangeable without an adapter that supports video, not only charging. Say the port on the computer and the port on the monitor.",
      },
      {
        topic: "Labels and containment",
        guidance:
          "Printed labels and a simple numbering scheme matter more than a particular brand of tie. Say if you want both ends of every cable labeled.",
      },
      {
        topic: "Printer supplies and media",
        guidance:
          "Quote toner and ink against the printer model. External disks and memory cards should state capacity and interface. These are supplies, not a backup design. Backup design sits under Servers & Storage.",
      },
    ],
    beyond: beyond(
      "HACIEN sources accessories per order with the main equipment or as a restock. The quotation lists lengths and quantities so a partial box is visible before you accept.",
      "Kits can be packed per seat or per closet when you ask for that grouping in the request.",
      "Accessories are usually delivered with the equipment they belong to. Installers fit patch cords and labels when installation of the parent system is in scope.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "The parent equipment: computer model, switch, or printer model.",
      "Cable type, length, color if it matters, and quantity.",
      "Adapters, with the port on each end.",
      "Consumable model numbers for toner, ink, or drums.",
    ],
  },
  {
    slug: "power-ups",
    whatItIs: [
      "Power protection keeps equipment up through a sag, a spike, or a short outage. A voltage regulator or automatic voltage regulator (AVR) corrects brownouts. An uninterruptible power supply (UPS) does that and also runs the load from a battery. Philippine office circuits see both, so a bare power strip is not a power design.",
      "HACIEN sizes the UPS from the load in watts and the minutes you need, not from the largest VA number on a box. Desktop PCs, switches, a NAS, and a rack server are different loads. The quotation states the topology, the VA and watt ratings, and the runtime the manufacturer publishes at a stated load. Runtime in your room will differ if the real load differs.",
    ],
    useCases: [
      {
        title: "One desk",
        text: "A PC, a monitor, and a router on a small line-interactive UPS can ride through a brief outage long enough to save work. Name every device on that UPS. A laser printer should stay off the battery. Its heater overwhelms a small unit.",
      },
      {
        title: "A network closet",
        text: "The firewall, the switch, and the internet modem should share a UPS so a short outage does not drop the whole floor. Add the watts. PoE switches are heavier than they look because they feed the cameras and access points.",
      },
      {
        title: "A server or NAS",
        text: "A server with a power supply that uses active power-factor correction needs a pure sine-wave output. Online double-conversion UPS units provide that and isolate the server from dirty input power. Line-interactive units are a weaker match for that load.",
      },
      {
        title: "A recorder and cameras",
        text: "If the NVR and its PoE switch are on a UPS, recording continues through a short outage. The cameras go dark if only the recorder is protected. Put both on the battery circuit you care about.",
      },
    ],
    specs: [
      {
        topic: "VA and watts",
        guidance:
          "VA is volts times amps. Watts are the real power the equipment draws. The two are related by power factor. A 1000 VA UPS might deliver only about 600 W if its power factor is 0.6. Size from the watt rating, and keep the continuous load near 60 to 80 percent of that watt rating so there is headroom.",
      },
      {
        topic: "Line-interactive and online",
        guidance:
          "A line-interactive UPS corrects voltage with a tap or a regulator and switches to battery when power fails. It suits PCs and small network gear. An online (double-conversion) UPS always runs the load from the inverter, so the output stays stable while the input sags. It is the usual choice for servers and sensitive closets. It costs more and runs warmer.",
      },
      {
        topic: "Runtime",
        guidance:
          "Manufacturers publish minutes at full load and at half load. Half load lasts longer than twice the full-load figure on many models, but only the published curve is evidence. Say whether you need five minutes to shut down or thirty minutes to ride through a typical utility blink.",
      },
      {
        topic: "Form, plug, and batteries",
        guidance:
          "Tower units sit beside a desk. Rack units use 2U or similar and need a shelf or rails. Philippine outlets and equipment plugs must match. A UPS with the wrong socket is not a small problem on delivery day. Batteries are a consumable, often replaced every few years. The replacement interval is whatever the manufacturer states for that model, confirmed in the quotation.",
      },
    ],
    beyond: beyond(
      "HACIEN sources UPS units and voltage regulators per order. Buyers often name APC, CyberPower, or Eaton. The quotation names the model that meets the watt and runtime figures you asked for, after the distributor confirms it.",
      "Load watts, topology, and plug type are written on the line so a later delivery is not a different class of UPS.",
      "Placement, wiring to a rack power strip, and a controlled shutdown test can be included when installation is in the request. Building electrical work stays with the building electrician unless the quotation explicitly adds it.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "Each device the UPS must carry, with watts if you know them.",
      "Minutes of runtime you need, and line-interactive or online if you have a preference.",
      "Tower or rack, and the plug or socket on site.",
      "Whether an AVR alone is enough, or the load must stay up on battery.",
    ],
  },
  {
    slug: "general-merchandise",
    whatItIs: [
      "General merchandise is the non-IT portion of a procurement package: office supplies, furniture, tools, hardware materials, and other commercial goods an office, school, or job site buys beside the computers. HACIEN quotes those lines in the same request as the IT when you want one set of papers, and quotes them alone when the package is only supplies.",
      "The exception is fixed. HACIEN does not supply products that require special regulatory licenses such as FDA or DOH-LTO. If a line needs that kind of license, leave it out of the request. Everything else still needs a clear description, a unit of measure, and a quantity. A brand is used when you name one. Otherwise the quotation proposes a commercial equivalent and waits for your approval.",
    ],
    useCases: [
      {
        title: "An office fit-out",
        text: "Desks, chairs, whiteboards, and basic tools often travel with the network and the PCs. Put them on the same request if you want one delivery schedule and one set of receipts.",
      },
      {
        title: "Schools and training centers",
        text: "Workshop tools, classroom supplies, and laboratory furniture sit beside computer-lab equipment. Name the tool or the material. Do not rely on a category name alone.",
      },
      {
        title: "Facilities and contractors",
        text: "Hand tools, power tools, and maintenance materials are quoted from the list you send. Industrial brands are sourced when you specify them. HACIEN does not treat a brand name as a standing appointment.",
      },
      {
        title: "A government lot that mixes IT and supplies",
        text: "Shopping and small-value requests sometimes combine bond paper, chairs, and a printer. HACIEN can itemize them so each line has a description, a unit, and a quantity that matches the purchase request.",
      },
    ],
    specs: [
      {
        topic: "Description and unit",
        guidance:
          "Write the item the way a receiving clerk will check it: material, size, color, and unit (piece, box, set, or lot). 'Assorted supplies' cannot be quoted or inspected.",
      },
      {
        topic: "Brand or equivalent",
        guidance:
          "If the specification says a brand 'or equivalent', say which features are mandatory: size, capacity, material, or a standard. HACIEN will not swap a brand silently.",
      },
      {
        topic: "Samples and brochures",
        guidance:
          "When the buyer requires a brochure or a sample before award, say so in the request. HACIEN attaches what the distributor can provide. A sample is not implied.",
      },
      {
        topic: "Excluded goods",
        guidance:
          "Products that need an FDA or DOH-LTO license are outside what HACIEN supplies. Medicines, food, and other regulated goods belong with a supplier who holds that license.",
      },
    ],
    beyond: beyond(
      "HACIEN sources general merchandise per order from commercial suppliers, including industrial tool and hardware brands when you specify them. Availability is confirmed in the quotation.",
      "Mixed IT and non-IT lots are itemized so a missing chair is not hidden inside a computer line.",
      "Delivery to the site is the default. Assembly of furniture or mounting of whiteboards is included only when the request asks for installation and the quotation accepts it.",
    ),
    rfqChecklist: [
      ...sharedRfq,
      "A line-by-line list with unit and quantity.",
      "Brand, or the words that mean an equivalent is acceptable.",
      "Which lines are IT and which are general goods, if the package is mixed.",
      "Any brochure, sample, or packing-list rule the receiving office enforces.",
    ],
  },
];

export function getCategoryGuide(slug: string) {
  return categoryGuides.find((guide) => guide.slug === slug);
}
