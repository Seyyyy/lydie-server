export default function Page({ params }: { params: { id: string } }) {
  return <div>My Store: {params.id}</div>;
}
