import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-black rounded-2xl p-6 mx-2 my-4 text-yellow text-center md:rounded-3xl">
      <div className="w-24 h-24 mx-auto mb-4 relative">
        <Image
          src={testimonial.profileImage}
          alt={testimonial.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <p className="text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex flex-col items-center">
        <span className="font-bold">{testimonial.name}</span>
        <span className="text-sm">- {testimonial.episode}</span>
      </div>
    </div>
  );
}
