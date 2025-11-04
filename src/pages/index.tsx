import { Link } from "umi";

const links = [
  { name: "Http", url: "/http" },
  { name: "Web3", url: "/web3" },
  { name: "File", url: "/file" },
];

export default function HomePage() {
  return (
    <ul className="section">
      {links.map((link) => (
        <li key={link.url} className="border-b last-of-type:border-none">
          <Link to={link.url} className="block px-[24px] py-[16px]">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
