object ScalaExcercises {;import org.scalaide.worksheet.runtime.library.WorksheetSupport._; def main(args: Array[String])=$execute{;$skip(68); 
	def sumFirstNIntegers(n: Int) = 1 to n sum;System.out.println("""sumFirstNIntegers: (n: Int)Int""");$skip(86); 
	
	def sumSquaresFirstNEvenIntegers(n: Int) = (1 to n map(_ * 2) map(x => x * x)).sum;System.out.println("""sumSquaresFirstNEvenIntegers: (n: Int)Int""");$skip(44); val res$0 = 
	
	

	
	
	
	sumSquaresFirstNEvenIntegers(2);System.out.println("""res0: Int = """ + $show(res$0))}
	//println(a)
}
