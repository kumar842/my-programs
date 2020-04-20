object ScalaExcercises {
	def sumFirstNIntegers(n: Int) = 1 to n sum//> sumFirstNIntegers: (n: Int)Int
	
	def sumSquaresFirstNEvenIntegers(n: Int) = (1 to n map(_ * 2) map(x => x * x)).sum
                                                  //> sumSquaresFirstNEvenIntegers: (n: Int)Int
	
	

	
	
	
	sumSquaresFirstNEvenIntegers(2)           //> res0: Int = 20
	//println(a)
}