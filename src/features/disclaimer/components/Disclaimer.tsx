export const Disclaimer = () => {
  return (
    <main className='min-h-screen flex flex-col items-center gap-6 p-6 bg-base-100 text-base-content'>
      <article className='max-w-prose flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>AVERTISSEMENT</h1>

        <p>
          PIF est une parodie. Les sociétés sont des sigles tirés au sort. Les sommes, les motifs et
          les distributions sortent d'un algorithme qui ne sait rien de toi, de ton site, ni de ton
          boulot.
        </p>

        <p>Toute ressemblance avec un système de primes existant serait le pur effet du hasard.</p>

        <p>
          Les prénoms qui apparaissent dans l'application peuvent être réels — saisis par le
          visiteur ou choisis par l'auteur. Mais aucun chiffre, aucun motif, aucune répartition
          rattachée à un prénom ne décrit le travail ou la rémunération réelle de qui que ce soit.
          Tout est tiré au sort.
        </p>

        <hr className='border-t opacity-40' />

        <p>
          PIF est né d'une frustration : voir un système d'évaluation qui ne récompense pas ce qu'il
          prétend récompenser. Le problème n'est pas individuel — c'est la mécanique qui crée le
          piège. Le système peut être mauvais sans qu'aucun de ceux qui le font tourner ne le soit.
        </p>
      </article>
    </main>
  )
}
