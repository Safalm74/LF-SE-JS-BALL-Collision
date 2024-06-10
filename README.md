# Ball Collision
Initially collision was done using div then shifted to canvas

#### Concept behind elastic collision
  1.  Calculating unit normal vector between this ball and the sibbling ball
  2.  Calculating unit tanget vector using unit normal vector
  3.  Evaluating scalar normal vectors and scalar tanget vectors for both this and sibbling ball
  4.  Using  formula below on normal scalar only. this is because when ball collides there is only change in normal not in tangent v_final_a= ((ma-mb)/(ma+mb))*va + (2*mb/(ma+mb)*vb)
  5. calculating new normal velocity vector and tangent velocity vector. by mul(unit vector, scalar values)
  6. Finally normal vector and tangent vector is added to get resultant velocity
    
