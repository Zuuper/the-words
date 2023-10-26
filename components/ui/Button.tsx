import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import { ComponentProps } from 'react'
interface ButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean
  children: React.ReactNode
}
export const Button = ({ isLoading, children, ...rest }: ButtonProps) => {
  return <motion.button
    whileHover={{
      scale: 1.1,
      transition: { duration: 0.25 }
    }}
    whileTap={{
      scale: 0.7,
      transition: { duration: 1 }
    }}

    className='p-4 bg-slate-900 text-slate-50 hover:bg-slate-700 rounded-lg active:bg-slate-800' {...rest}>

    {isLoading ? <>loading..</> : <>{children}</>}
  </motion.button>
}