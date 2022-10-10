import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css"



interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder ?:boolean;
}

export function Avatar({ hasBorder = true, ...props  }:AvatarProps) { // buscou as props hasBorder e src e aplicou os valores
    // default para ela, isso é conceito de desetruturação
    // caso o hasBorder não tenha propriedades nela o valor como padrão sera true
    // todos os stributos da imagem ficam salvos no ...props com rest operator

    return (
        <img
        className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
        {...props}
        // chamou as props dentro da tag img, e quando esse componente for chamado em outro lugar poderemos
        // usar src title alt entre outros componentes da imagem, usando o spread operator
        // então todas as propriedades que forem passadas para o img no component comment,
        // serão automaticamente enviadas para o img
        
        
        //className={props.hasBorder ? styles.avatar : styles.avatar} 
        // se for o hasborder exibira com a estilização styles.avatarWithBorder se não styles.avatar 
        />
    )
} 