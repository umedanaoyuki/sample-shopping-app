type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <div className="flex flex-row w-full">
      <div className="flex w-full py-36 px-20">{children}</div>
    </div>
  );
}
